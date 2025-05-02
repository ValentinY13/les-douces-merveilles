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
import {useUserStore} from "~/store/user";

const cartStore = useCartStore()
const userStore = useUserStore()

onMounted(async () => {
  await cartStore.fetchCart();
  await userStore.initSession()

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
