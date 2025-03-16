import {defineStore, acceptHMRUpdate} from 'pinia';
import type {CartItemLocal} from "~/types/cartLocal";
import type {Product} from "~/types";
import {tryCatch} from "standard-as-callback/built/utils";

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: {
            id: null,
            user_id: null,
        },
        items: [] as CartItemLocal[],
    }),

    persist: true,

    getters: {
        total: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    },

    actions: {
        async initializeCart(user_id) {
            if (!user_id) return;

            try {
                const response = await $fetch('/api/cart', {
                    method: 'GET',
                    query: {user_id: user_id}
                })
                this.cart = {...this.cart, id: response.id, user_id: response.user.id};
                response.cart_item.forEach((item) => {
                    this.items.push({
                        product_id: item.product.id,
                        name: item.product.name,
                        number_pieces: item.product.number_pieces,
                        image_id: item.product.preview_image.id,
                        filename_download: item.product.preview_image.filename_download,
                        price: item.product.price,
                        quantity: item.quantity,
                    })
                })

            } catch (e) {
                console.log(e)
            }
        },

        addToCart(product: Product) {
            const existingItem = this.items.find((item) => item.product_id === product.id);

            if (existingItem) {
                existingItem.quantity += product.quantity;
            } else {
                this.items.push({
                    product_id: product.id,
                    name: product.name,
                    number_pieces: product.number_pieces,
                    image_id: product.images[0].directus_files_id?.id,
                    filename_download: product.images[0].directus_files_id?.filename_download,
                    price: product.price,
                    quantity: product.quantity
                })
            }
        },

        updateQuantity(product_id: number, newQuantity: number) {
            const itemIndex = this.items.findIndex(item => item.product_id === product_id);
            if (itemIndex === -1) return;

            newQuantity > 0
                ? this.items[itemIndex].quantity = newQuantity
                : this.items.splice(itemIndex, 1);
        },

        removeFromCart(productId: number) {
            this.items = this.items.filter((item) => item.product_id !== productId);
        },

        clearCart() {
            this.items = []
        },

        async saveCart() {
            try {
                const response = await $fetch(`/api/cart/${this.cart.id}`, {
                    method: 'PUT',
                    body: this.items
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
