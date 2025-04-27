<template>
  <div>
    <NuxtLayout>
      <NuxtRouteAnnouncer/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/store/cart";

const cartStore = useCartStore()
const {$directus} = useNuxtApp()

onMounted(async () => {
  await $directus.refresh().catch(() => {
  })
  await cartStore.fetchCart();
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.5rem);
}
</style>
