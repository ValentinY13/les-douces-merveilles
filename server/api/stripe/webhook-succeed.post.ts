import Stripe from 'stripe';

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
    let attemptCount = 0;

    // génère un numéro aléatoire et effectue 3 essais pour poster l'order afin d'éviter le problème d'unicité de numéro
    while (!successOrderPost && attemptCount < 3) {
        try {
            attemptCount++;

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
                    order_number: orderNumber
                }
            });

            successOrderPost = true;

        } catch (e) {
        }
    }


})