<template>
  <div class="shadow-card">
    <nuxt-picture provider="directus"
                  :src="`${image.id}/${image.filename_download}`"
                  :alt="product.name"
                  :img-attrs="{ class: 'w-full h-[300px] md:h-[400px] object-cover' }"
                  class="card-gradient--slide"
    ></nuxt-picture>
    <div class="p-6 absolute bottom-0 left-0 text-white z-30">
      <p class="text-sm xl:text-base font-play uppercase">{{ product.name }}</p>
      <p class="text-sm xl:text-base mt-2"><span v-if="product.number_pieces">{{
          product.number_pieces
        }} pièces - </span>{{ product.price }} €</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Product} from "~/types"

const props = defineProps<{
  product: Product
}>()

const image = props.product.images[0].directus_files_id

</script>

<style scoped>

</style>