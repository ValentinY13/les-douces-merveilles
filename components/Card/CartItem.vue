<template>
  <article class="border-t border-grey-100 py-8 lg:grid lg:grid-cols-2">
    <div class="sm:flex sm:flex-row sm:items-center sm:gap-4">
      <nuxt-picture class="w-fit"
                    provider="directus"
                    :src="`${product.preview_image?.id}/${product.preview_image?.filename_download}`"
                    :alt="product.name"
                    :img-attrs="{ class: 'w-52 h-52 object-cover' }"
      ></nuxt-picture>
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
        <AddRemove class="w-full my-4 lg:w-fit" product-name="test"/>
      </div>
      <div class="flex justify-between">
        <p class="uppercase font-medium">Sous-total: 100,00€</p>
        <i class="icon icon-delete text-2xl "></i>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type {Product} from "~/types";

defineProps<{
  product: Product
}>()
</script>

<style scoped>

</style>