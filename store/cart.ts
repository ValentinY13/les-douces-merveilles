import {defineStore, acceptHMRUpdate} from 'pinia';
import type {CartItemLocal} from "~/types/cartLocal";
import type {Product} from "~/types";

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: null as any,
        items: [] as CartItemLocal[],
    }),

    persist: true,

    getters: {
        total: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    },

    actions: {
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

    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
