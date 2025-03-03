<template>
  <div class="text-center text-brown-700 uppercase">
    <h3 class="text-h3-medium mb-4">{{ subtitle }}</h3>
    <h2 id="presentation" class="text-h2">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string | null
}>()
</script>

<style scoped>

</style>