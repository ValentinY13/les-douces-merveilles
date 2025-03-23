<template>
  <div>
    <button @click="router.back()" class="inline-flex space-x-2 text-brown-100 cursor-pointer">
      <i class="icon icon-simple-chevron-bold text-2xl"></i>
      <span>Retour</span>
    </button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

</script>

<style scoped>

</style>