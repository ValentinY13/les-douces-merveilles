<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="relative bg-white max-w-[430px] md:max-w-[600px] mx-auto shadow-card">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>