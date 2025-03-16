import {directusServer, updateItem} from "~/server/utils/directus-server";

export default defineEventHandler(async (event) => {
    const cart_id = event.context.params?.cart_id
    const body = await readBody(event)

    const cartItems = body.map(item => ({
        product: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price) * item.quantity,
        cart: cart_id,
        status: 'published',
    }))

    const totalCart = cartItems.reduce((sum, item) => sum + item.price, 0);
    const response = await directusServer.request(updateItem('cart',
        cart_id, {
            total: totalCart,
            cart_item: cartItems,
        }
    ))
})