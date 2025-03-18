import {createItem, directusServer, readItems, readUser} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    const {user_id} = getQuery(event)
    const {productIds} = getQuery(event)

    // const user = await directusServer.request(readUser(user_id as string))

    // si pas connecté
    if (!user_id) {
        const response = await directusServer.request(readItems('product', {
            fields: [
                'id',
                'name',
                'price',
                'number_pieces',
                {
                    preview_image: [
                        'id',
                        'filename_download'
                    ]
                }
            ],
            filter: {
                id: {
                    _in: productIds
                }
            }
        }))

        console.log(response)
        return response;
    }

    const response = await directusServer.request(readItems('cart', {
        fields: [
            'id',
            {
                user: ['id']
            },
            {
                cart_item: [
                    'id',
                    'quantity',
                    {
                        product: [
                            'id',
                            'price',
                            'name',
                            'number_pieces',
                            {
                                preview_image: [
                                    'id',
                                    'filename_download'
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        filter: {
            user: {
                _eq: user.id
            }
        }
    }))

    const alreadyACart = response[0];

    if (!alreadyACart) {
        try {
            return await directusServer.request(createItem('cart', {
                status: 'published',
                user: user.id,
                user_created: user_id,
            }))
        } catch (e) {
            return {error: true, message: 'Impossible de créer le panier'}
        }
    }

    return alreadyACart;
})