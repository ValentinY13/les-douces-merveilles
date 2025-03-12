<template>
  <div>
    <nuxt-link to="/" class="inline-flex space-x-2 text-brown-100">
      <i class="icon icon-simple-chevron-bold text-2xl"></i>
      <span>Retour</span>
    </nuxt-link>
    <h1 class="text-h2 uppercase text-brown-700">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>

</style>