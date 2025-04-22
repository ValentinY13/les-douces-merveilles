import Stripe from 'stripe';
import {createItem, directusServer} from "~/server/utils/directus-server";

export default defineEventHandler(async (event) => {
    const stripeEvent = await readBody<Stripe.Event>(event);
    const stripeSecret = useRuntimeConfig().stripe_secret_key;

    const stripe = new Stripe(stripeSecret);

    const session = stripeEvent.data.object

    const userId = session.metadata.user_id;

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
    try {
        const response = await directusServer.request(createItem('orders', {
            total: session.amount_total / 100,
            user: userId,
            order_lines: orderLines,
        }))

    } catch (e) {
        console.error(e.errors[0]);
    }

})