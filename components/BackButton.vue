<template>
  <div>
    <button @click="router.back()" class="inline-flex space-x-2 text-brown-100 cursor-pointer">
      <i class="icon icon-simple-chevron-bold text-2xl"></i>
      <span>Retour</span>
    </button>
    <h1 class="text-h2 uppercase text-brown-700">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()

const router = useRouter()
</script>

<style scoped>

</style>