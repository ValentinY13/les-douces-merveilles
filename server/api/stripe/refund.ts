import Stripe from "stripe";
import {directusServer, updateItem, triggerFlow} from "~/server/utils/directus-server";

export default defineEventHandler(async (event) => {
    const stripeSecret = useRuntimeConfig().stripe_secret_key;
    const stripe = new Stripe(stripeSecret);

    const order = await readBody(event);
    const FLOW_ID = useRuntimeConfig().refund_mail_id
    const orderProductIds = order.order_lines.map(line => line.product.id)

    try {
        const refund = await stripe.refunds.create({
            payment_intent: order.payment_intent
        })

        await directusServer.request(updateItem('orders', order.id, {
            status: 'refund',
        }))

        await directusServer.request(triggerFlow('POST', FLOW_ID, order))

        const products = await directusServer.request(readItems('product', {
            fields: [
                'id',
                'number_stock'
            ],
            filter: {
                id: {
                    _in: orderProductIds
                }
            }
        }))

        const updatedStocks = products.map(product => {
            const orderedItem = order.order_lines.find(line => line.product.id === product.id)
            return {id: product.id, number_stock: product.number_stock + orderedItem.quantity}
        })

        const token = process.env.STATIC_TOKEN_WEBHOOK;
        const url = process.env.DIRECTUS_URL;

        for (const item of updatedStocks) {
            await $fetch(`${url}/items/product/${item.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    number_stock: item.number_stock,
                }
            });
        }

        return {
            status: "success",
            errorMessage: "Remboursement effectué, un mail de confirmation a été envoyé"
        }
    } catch (e) {
        console.log(e)
    }
})