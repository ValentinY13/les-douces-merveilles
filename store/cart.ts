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
        // async fetchCart() {
        //     const {$directus, $readItems} = useNuxtApp()
        //
        //     const data = await $directus.request($readItems('cart', {
        //         fields: ['*']
        //     }));
        //     console.log(data);
        //     if (data.length) {
        //         this.cart = data[0];
        //     }
        //
        //     return this.cart;
        //     // else créer un cart via une fonction createCart()
        // },
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

        removeFromCart(productId: string) {
            this.items = this.items.filter((item) => item.id !== productId);
        },

        clearCart() {
            this.items = []
            // this.saveCart()
        },

        // saveCart() {
        //     localStorage.setItem('cart', JSON.stringify(this.items));
        // },
        //
        // loadCart() {
        //     this.items = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
        // }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
