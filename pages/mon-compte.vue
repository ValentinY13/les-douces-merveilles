<script setup lang="ts">
const {$directus, $isAuthenticated, $logout} = useNuxtApp()

onMounted(async () => {
  await $directus.refresh()
})

let user = ref()

const readMe = async () => {
  user = await $isAuthenticated()
}
</script>

<template>
  <div>
    <h1>TEST</h1>
    <button class="btn" @click="readMe()">Data</button>
    <pre>{{ user }}</pre>
    <button class="btn" @click="$logout()">déconnexion</button>
  </div>
</template>

<style scoped>

</style>