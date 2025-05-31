<script setup lang="ts">
const {$directus, $readItems} = useNuxtApp()

const {data} = await useAsyncData('cgv', async () => {
  return $directus.request($readItems('cgv', {
    fields: ['content'],
  }))
})

const htmlContent = computed(() => data.value?.content || '')
</script>

<template>
  <main class="py-24">
    <div v-html="htmlContent" class="prose px-6 responsive-layout "></div>
  </main>
</template>

<style scoped>

</style>