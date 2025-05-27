import {defineStore, acceptHMRUpdate} from 'pinia';
import type {CartItemLocal} from "~/types/cartLocal";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItemLocal[],
        cartStorage: [] as { product_id: number, quantity: number }[],
        errors: {} as { type: 'success' | 'error', message: string },
    }),

    persist: {
        pick: ['cartStorage'],
    },

    getters: {
        total: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),

        isCartEmpty: (state) => state.cartStorage.length === 0,
    },

    actions: {
        async fetchCart() {

            if (this.cartStorage.length === 0) {
                this.items = []
                return
            }

            const productIds = this.cartStorage.map((item) => item.product_id);

            try {
                const response = await $fetch('/api/cart', {
                    method: 'GET',
                    query: {productIds: productIds}
                })

                this.items = response.map(product => {
                    const item = this.cartStorage.find((el) => el.product_id === product.id);
                    return {
                        ...product,
                        quantity: item ? item.quantity : 1,
                    }
                })

            } catch (e) {
            }
        },

        addToCart(productId: number, quantity: number, max: number) {
            const item = this.cartStorage.find(el => el.product_id === productId);

            if (item && (item.quantity + quantity) > max) {
                this.errors = {type: 'error', message: `La quantité maximum autorisée pour ce produit est de ${max}`};
                return;
            }

            if (item) {
                item.quantity += quantity;
            } else {
                this.cartStorage.push({product_id: productId, quantity: quantity});
            }

            this.errors = {type: 'success', message: `${quantity} produit(s) ajouté au panier`}
            this.fetchCart()
        },

        updateQuantity(productId: number, newQuantity: number) {
            const item = this.cartStorage.find(item => item.product_id === productId);

            if (item) {
                item.quantity = newQuantity;
                if (item.quantity <= 0) {
                    this.removeFromCart(productId);
                } else {
                    this.fetchCart();
                }
            }
        },

        removeFromCart(productId: number) {
            this.cartStorage = this.cartStorage.filter((item) => item.product_id !== productId);
            this.fetchCart()
        },

        resetCart() {
            this.cartStorage = [];
            this.items = [];
        }
    },

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
