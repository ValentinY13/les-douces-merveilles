import {directusServer, readItems, updateItem} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    const body = await readBody((event))

    if (!body.order_id || !body.date || !body.time_slot_id) {
        return {
            status: 'error',
            errorMessage: 'Une erreur est survenue'
        }
    }

    const order_id = body.order_id

    // récupération de la commande en DB
    const order = await directusServer.request(readItems('orders', {
        fields: [
            'id',
            'pickup_date',
            'payment_intent',
            {
                user: [
                    'email'
                ]
            },
            'order_number',
            {
                order_lines: [
                    {
                        product: [
                            'id',
                            'name',
                        ]
                    },
                    'quantity',
                    'price'
                ]
            },
            'total',
            'date_created',
        ],
        filter: {
            id: {
                _eq: order_id
            }
        }
    }))

    if (order.length === 0) {
        return {
            status: 'error',
            errorMessage: 'Erreur lors de la récupération de la commande'
        }
    }

    // check si la commande est bien dans au moins 48h
    const today = new Date().setHours(0, 0, 0, 0)
    const pickup_date = new Date(order[0].pickup_date).setHours(0, 0, 0, 0)

    const diffInMinutes = pickup_date - today
    const diffInDays = diffInMinutes / (1000 * 60 * 60 * 24)

    if (diffInDays < 2) {
        return {
            status: 'error',
            errorMessage: 'Commande modifiable 48h à l\'avance seulement'
        }
    }

    if (body.cancel_order) {
        return await $fetch('/api/stripe/refund', {
            method: "POST",
            body: order[0]
        })
    }

    // récupération des settings
    const settings = await directusServer.request(readItems('pickup_settings', {
        fields: [
            'max_orders_per_day',
            'max_orders_per_slot',
        ]
    }))

    // nombre de commande pour la nouvelle date choisie
    const numberOrderThisDay = await directusServer.request(readItems('orders', {
        fields: [
            '*'
        ],
        aggregate: {count: 'pickup_date'},
        groupBy: ['pickup_date'],
        filter: {
            pickup_date: {
                _eq: body.date
            }
        }
    }))

    const orderCount = numberOrderThisDay[0]?.count?.pickup_date || 0

    // stop si limite déjà atteinte pour ce jour
    if (orderCount >= settings[0].max_orders_per_day) {
        return {
            status: 'error',
            errorMessage: 'Cette date n\'est plus disponible',
        }
    }

    // nombre de commande pour ce jour et pour ce créneau horaire
    const response = await directusServer.request(readItems('orders', {
        fields: [
            '*'
        ],
        aggregate: {count: 'pickup_time_slot'},
        groupBy: ['pickup_time_slot', 'pickup_date'],
        filter: {
            pickup_date: {
                _eq: body.date
            }
        }
    }))

    // renvoie objet {slotid: nbPourCeSlot}
    const slotCounts = response.reduce((acc, order) => {
        const slotId = order.pickup_time_slot;
        acc[slotId] = (acc[slotId] || 0) + order.count.pickup_time_slot;
        return acc;
    }, {});

    // error si le créneau ajouté dépassera le nombre max
    for (const [key, value] of Object.entries(slotCounts)) {
        if (key === body.time_slot_id && value + 1 > settings[0].max_orders_per_slot) {
            return {
                status: 'error',
                errorMessage: 'Ce créneau horaire n\'est plus disponible',
            }
        }
    }

    try {
        await directusServer.request(updateItem('orders', order_id, {
            pickup_date: body.date,
            pickup_time_slot: body.time_slot_id
        }))

        return {
            status: 'success',
            errorMessage: 'Modification effectuée',
        }
    } catch (e) {

    }
})