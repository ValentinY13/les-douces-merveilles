import Stripe from 'stripe';
import {directusServer, readItems} from '~/server/utils/directus-server'

interface CartProduct {
    product_id: number;
    quantity: number;
}

interface Order {
    products: CartProduct[];
    slotId: number;
    date: string;
    userId: string;
}

export default defineEventHandler(async (event) => {
    const stripeSecret = useRuntimeConfig().stripe_secret_key;

    const stripe = new Stripe(stripeSecret);

    const items = await readBody(event) as Order;

    const itemsIds = items.products.map(item => item.product_id)

    const settings = await directusServer.request(readItems('pickup_settings', {
        fields: [
            'max_orders_per_day',
            'max_orders_per_slot'
        ],
    }))

    // Récupère le nombre de commandes déjà enregistrées pour une date
    const checkNumberPerDay = await directusServer.request(readItems('orders', {
        fields: [
            'id',
            'pickup_date',
            {
                pickup_time_slot: ['*']
            }
        ],
        aggregate: {count: 'pickup_date'},
        groupBy: ['pickup_date'],
        filter: {
            pickup_date: {
                _eq: items.date,
            }
        }
    }))

    const dateCount = checkNumberPerDay?.[0]?.count?.pickup_date ?? 0;

    if (dateCount >= settings.max_orders_per_day) {
        return {
            status: 'error',
            errorMessage: 'Le jour choisi est indisponible'
        }
    }

    // Récupère le nombre de commandes déjà enregistrées pour un créneau
    const checkNumberPerSlot = await directusServer.request(readItems('orders', {
        fields: [
            'id',
            'pickup_date',
            {
                pickup_time_slot: ['*']
            }
        ],
        aggregate: {count: 'pickup_time_slot'},
        groupBy: ['pickup_time_slot', 'pickup_date'],
        filter: {
            pickup_date: {
                _eq: items.date,
            },
            pickup_time_slot: {
                _eq: items.slotId
            }
        }
    }))

    const slotCount = checkNumberPerSlot?.[0]?.count?.pickup_time_slot ?? 0;

    if (slotCount >= settings.max_orders_per_slot) {
        return {
            status: 'error',
            errorMessage: 'L\'heure de retrait est indisponible'
        }
    }

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
        const item = items.products.find(i => i.product_id === product.id)
        return item && product.number_stock >= item.quantity
    })

    if (validateProduct.length !== items.products.length) {
        return {
            status: 'error',
            errorMessage: `Votre panier est invalide, vérifiez vos produits`
        }
    }

    const lineItems = items.products.map(item => {
        const product = productInDb.find(p => p.id === item.product_id)

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

    const url = process.env.NUXT_URL

    return await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
            user_id: items.userId,
            slotId: items.slotId,
            date: items.date,
        },
        mode: 'payment',
        success_url: `${url}/panier-confirmation`,
        cancel_url: `${url}/error`,
    })
})
