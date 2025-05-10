<template>
  <div class="text-center uppercase" :class="`text-${color}-700`">
    <h3 class="text-h3-medium mb-4 reveal reveal-left-300">{{ subtitle }}</h3>
    <h2 :id="id" class="text-h2 reveal reveal-right-300">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  title: string
  subtitle?: string | null
  color?: 'brown' | 'grey'
  id: string
}>(), {
  color: 'brown'
})

</script>

<style scoped>

</style>