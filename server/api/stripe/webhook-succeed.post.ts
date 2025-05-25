import Stripe from 'stripe';
import {directusServer, triggerFlow, readUser, readItems} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    const stripeEvent = await readBody<Stripe.Event>(event);
    const stripeSecret = useRuntimeConfig().stripe_secret_key;

    const stripe = new Stripe(stripeSecret);

    const session = stripeEvent.data.object

    const userId = session.metadata.user_id;

    const pickupId = session.metadata.slotId;
    const pickupDate = new Date(session.metadata.date).toISOString();

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product']
    })

    const productIds = lineItems.data.map((lineItem) => lineItem.price.product.metadata.directus_product_id);

    const orderLines = lineItems.data.map((lineItem) => ({
        product: lineItem.price.product.metadata.directus_product_id,
        price: lineItem.price.unit_amount / 100,
        quantity: lineItem.quantity,
        sub_total: lineItem.amount_total / 100,
    }));

    let successOrderPost = false;

    // génère un numéro aléatoire et retourne dans le while si j'ai RECORD_NOT_UNIQUE
    while (!successOrderPost) {
        try {
            const token = process.env.STATIC_TOKEN_WEBHOOK;
            const url = process.env.DIRECTUS_URL;
            const orderNumber = generateOrderNumber();

            const response = await $fetch(`${url}/items/orders`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    total: session.amount_total / 100,
                    user: userId,
                    order_lines: orderLines,
                    pickup_date: pickupDate,
                    pickup_time_slot: pickupId,
                    order_number: orderNumber,
                    payment_intent: session.payment_intent,
                }
            });

            const order = await directusServer.request(readItems('orders', {
                fields: [
                    'order_number',
                    'pickup_date',
                    {
                        pickup_time_slot: [
                            'start_time',
                            'end_time',
                        ]
                    },
                    {
                        user: ['email']
                    },
                    {
                        order_lines: [
                            {
                                product: ['name']
                            },
                            'quantity',
                            'sub_total',
                        ]
                    },
                    'total',
                    'date_created',
                ],
                filter: {
                    order_number: orderNumber
                },
            }))

            await directusServer.request(triggerFlow('POST', '7a8fdda3-69b0-48e4-b26b-c4f986197ddc', order[0]))

            successOrderPost = true;

        } catch (e) {
            const errorCode = e?.response?._data?.errors?.[0]?.extensions?.code;

            if (errorCode === 'RECORD_NOT_UNIQUE') {
                // Nouvelle tentative avec un autre numéro
                continue;
            }

            // Stoppe la boucle pour ne pas tenter inutilement
            break;
        }
    }


})
