<template>
  <main class="px-6 pt-14 pb-24">
    <section class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <Stepper class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4" :step="-1"/>
        <BackButton class="py-12 md:pt-8">
          <h1 class="text-h2 uppercase text-brown-700">Panier</h1>
        </BackButton>
      </div>

      <div v-if="!isLoaded" class="flex justify-center py-12">
        <Spinner class="size-6"/>
      </div>

      <div v-else-if="isLoaded && cartStore.items.length">
        <CardCartItem
            v-for="(product, index) in cartStore.items"
            :key="product.id"
            :product="product"
            :disabled="outOfStockIds.includes(product.id)"
            :class="index === cartStore.items.length - 1 ? 'border-b border-grey-100' : ''"
        ></CardCartItem>
        <p class="py-12 text-h3 text-right tracking-wide">Total TVAC: <span
            class="text-brown-700 font-medium">{{ totalPrice.toFixed(2) }}€</span></p>
        <div class="text-center">
          <nuxt-link title="Valider le panier" @click="handleClick" class="btn">Valider le panier
          </nuxt-link>
        </div>
      </div>
      <p v-else>Votre panier est vide</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import {useCartStore} from "~/store/cart";

const cartStore = useCartStore();
const isLoaded = ref(false);
const {$toast, $isAuthenticated} = useNuxtApp()

const user = await $isAuthenticated()

const outOfStockIds = ref([]);

onMounted(() => {
  isLoaded.value = true;
});

const totalPrice = computed(() => cartStore.total);

const handleClick = async () => {
  const response = await useCheckStock();

  if (response.status === 'error') {
    outOfStockIds.value = response.unavailableIds || [];
    $toast.error(response.errorMessage);
    return;
  }

  if (response.status === 'partial') {
    response.partials?.forEach(({id, availableQty}) => {
      cartStore.updateQuantity(id, availableQty);
    });
    $toast.info(response.errorMessage);
    return;
  }

  const nextRoute = user ? '/date-click-and-collect' : '/panier-identification';
  await navigateTo(nextRoute);
};
</script>

<style scoped>

</style>