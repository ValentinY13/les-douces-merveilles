<template>
  <nuxt-link :to="`/nos-collections/${item.sub_category.slug}/${item.slug}`" title="Voir produit"
             class="group relative max-w-[450px] cursor-pointer">
    <div :class="isAvailable ? '' : 'opacity-50'">
      <nuxt-picture provider="directus"
                    :alt="item.name"
                    :src="`${item.images[0].directus_files_id?.id}/${item.images[0].directus_files_id?.filename_download}`"
                    :img-attrs="{ class: 'w-full aspect-square object-cover shadow-card transition-opacity duration-600 group-hover:opacity-0 ' }"
      ></nuxt-picture>

      <!-- Image au hover -->
      <nuxt-picture v-if="item.images[1]" provider="directus"
                    :alt="item.name"
                    :src="`${item.images[1].directus_files_id?.id}/${item.images[1].directus_files_id?.filename_download}`"
                    :img-attrs="{ class: 'w-full aspect-square object-cover shadow-card absolute top-0 left-0 opacity-0 transition-opacity duration-600 group-hover:opacity-100' }"
      ></nuxt-picture>
    </div>
    <div class="py-4">
      <h2 class="text-h3-play uppercase text-brown-700">{{ item.name }}</h2>
      <p v-if="isAvailable" class="text-brown-100 tracking-wider">{{
          item.number_pieces
        }} pièce{{ item.number_pieces > 1 ? 's' : '' }} -
        {{
          item.price
        }} €</p>
      <p v-else class="text-brown-100 tracking-wider">Produit indisponible</p>
    </div>
  </nuxt-link>
</template>


<script setup lang="ts">
import type {Product} from '~/types'

const props = defineProps<{
  item: Product
}>()

// TODO bloquer le clique si pas dispo + griser la photo

const isAvailable = computed(() => {
  return props.item.is_available && props.item.number_stock > 0
})

</script>

<style scoped>

</style>