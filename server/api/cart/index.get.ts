import {directusServer, readItems} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    const {productIds} = getQuery(event)

    return await directusServer.request(readItems('product', {
        fields: [
            'id',
            'name',
            'price',
            'number_pieces',
            'slug',
            'max',
            {
                preview_image: [
                    'id',
                    'filename_download'
                ]
            },
            {
                sub_category: [
                    'slug'
                ]
            }
        ],
        filter: {
            id: {
                _in: productIds
            }
        }
    }));
})