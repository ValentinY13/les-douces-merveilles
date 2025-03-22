<template>
  <article class="border-t border-grey-100 py-8 lg:grid lg:grid-cols-2">
    <div class="sm:flex sm:flex-row sm:items-center sm:gap-4">
      <nuxt-link :title="product.name" :to="`/nos-collections/${product.sub_category.slug}/${product.slug}`">
        <nuxt-picture class="w-fit"
                      provider="directus"
                      :src="`${product.preview_image.id}/${product.preview_image.filename_download}`"
                      :alt="product.name"
                      :img-attrs="{ class: 'w-52 h-52 object-cover' }"
        ></nuxt-picture>
      </nuxt-link>
      <div class="py-4">
        <h2 class="text-h3-play uppercase text-brown-700">{{ product.name }}</h2>
        <p class="text-brown-100 w- tracking-wider">{{ product.number_pieces }}
          pièce{{ product.number_pieces > 1 ? 's' : '' }}</p>
        <p class="text-brown-100 tracking-wider">{{ product.price }} €</p>
      </div>
    </div>
    <div class="md:grid md:grid-cols-2 md:items-center md:gap-6 lg:justify-between">
      <div class="lg:inline-flex lg:items-center lg:gap-4">
        <p class="hidden lg:inline-block">Quantité: </p>
        <AddRemove
            class="w-full my-4 lg:w-fit"
            :initial-quantity="product.quantity"
            :product-name="product.name"
            :max="product.max"
            :canRemove="true"
            @update:quantity="updateQuantity(product.id, $event)"
        />
      </div>
      <div class="flex justify-between">
        <p class="uppercase font-medium">Sous-total: {{ (product.price * product.quantity).toFixed(2) }}€</p>
        <i class="icon icon-delete text-2xl cursor-pointer hover:text-red-700"
           @click="cartStore.removeFromCart(product.id)"></i>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type {CartItemLocal} from "~/types/cartLocal";
import {useCartStore} from "~/store/cart";

defineProps<{
  product: CartItemLocal
}>()

const cartStore = useCartStore()

const updateQuantity = (product_id: number, newQuantity: number) => {
  cartStore.updateQuantity(product_id, newQuantity)
}
</script>

<style scoped>

</style>