<template>
  <div class="text-center uppercase" :class="`text-${color}-700`">
    <h2 class="text-h3-medium mb-4 reveal reveal-left-300">{{ subtitle }}</h2>
    <h3 :id="id" class="text-h2 reveal reveal-right-300">{{ title }}</h3>
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