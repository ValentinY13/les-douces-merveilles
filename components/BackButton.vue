<template>
  <div>
    <button
        @click="router.back()"
        class="inline-flex space-x-2 text-brown-100 cursor-pointer group"
    >
      <i class="icon icon-simple-chevron-bold text-2xl transform transition-transform duration-400 group-hover:-translate-x-2 group-hover:text-brown-700"></i>
      <span class="transform transition-transform duration-400 group-hover:-translate-x-1 group-hover:text-brown-700">Retour</span>
    </button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

</script>

<style scoped>

</style>