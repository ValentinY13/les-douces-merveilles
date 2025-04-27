<script setup lang="ts">
const {$directus, $isAuthenticated, $logout} = useNuxtApp()

let user = ref()

const readMe = async () => {
  user = await $isAuthenticated()
  console.log(user)

}

definePageMeta({
  middleware: 'auth',
})
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