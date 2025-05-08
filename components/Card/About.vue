<script setup lang="ts">
defineProps<{
  description: string
  url: string
}>()
</script>

<template>
  <article class="">
    <nuxt-picture :src="url"
                  :img-attrs="{class: 'object-cover aspect-square w-full max-h-350px border border-brown-700 shadow-card'}"></nuxt-picture>
    <h3 class="font-medium text-center py-4">{{ description }}</h3>
  </article>
</template>

<style scoped>

</style>