import Stripe from 'stripe';
import {directusServer} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    const stripeSecret = useRuntimeConfig().stripe_secret_key;

    const stripe = new Stripe(stripeSecret);

    const items = await readBody(event) as [{ product_id: string, quantity: number }];

    const itemsIds = items.map(item => item.product_id)


    const productInDb = await directusServer.request(readItems('product', {
        fields: [
            'id',
            'number_stock',
            'name',
            'description',
            'price',
            {
                preview_image: [
                    'id',
                ]
            }
        ],
        filter: {
            id: {
                _in: itemsIds,
            },
            is_available: {
                _eq: true
            },
        }
    }))

    const validateProduct = productInDb.filter(product => {
        const item = items.find(i => i.product_id === product.id)
        return item && product.number_stock >= item.quantity
    })

    if (validateProduct.length !== items.length) {
        return {
            status: 'error',
            errorMessage: `Votre panier est invalide, vérifiez vos produits`
        }
    }

    const lineItems = items.map(item => {
        const product = productInDb.find(p => p.id === item.product_id)

        const directusUrl = process.env.DIRECTUS_URL

        return {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: product.name,
                    metadata: {
                        directus_product_id: product.id,
                    },
                },
                unit_amount: Math.round(product.price * 100), // Stripe veut des centimes
            },
            quantity: item.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
            user_id: "11548cf8-60e2-4772-ac89-0d5d9c141463"
        },
        mode: 'payment',
        success_url: 'http://localhost:3000/panier-confirmation',
        cancel_url: 'http://localhost:3000/error',
    })

    return session
})
