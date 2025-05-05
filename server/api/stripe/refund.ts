import Stripe from "stripe";
import {directusServer, updateItem} from "~/server/utils/directus-server";

export default defineEventHandler(async (event) => {
    const stripeSecret = useRuntimeConfig().stripe_secret_key;
    const stripe = new Stripe(stripeSecret);

    const items = await readBody(event);

    try {
        const refund = await stripe.refunds.create({
            payment_intent: items.payment_intent
        })

        await directusServer.request(updateItem('orders', items.order_id, {
            status: 'refund',
        }))

        return {
            status: "success",
            errorMessage: "Remboursement effectué, un mail de confirmation a été envoyé"
        }
    } catch (e) {
        console.log(e)
    }
})