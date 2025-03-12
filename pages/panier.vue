<template>
  <main>
    <section class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <Stepper class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4" :step="0"/>
        <BackButton class="py-12 md:pt-8" title="Panier"/>
      </div>
      <div v-if="isLoaded &&  cartStore.items.length">
        <CardCartItem
            v-for="(product, index) in cartStore.items"
            :key="product.product_id"
            :product="product"
            :class="index === cartStore.items.length - 1 ? 'border-b border-grey-100' : ''"
        ></CardCartItem>
        <p class="py-12 text-h3 text-right tracking-wide">Total TVAC: <span
            class="text-brown-700 font-medium">100.00€</span></p>
        <div class="text-center">
          <nuxt-link title="Valider le panier" to="/" class="btn">Valider le panier</nuxt-link>
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

onMounted(() => {
  isLoaded.value = true;
});

// const {data: products} = await useAsyncData('product-details', async () => {
//       return $directus.request($readItems('product', {
//         fields: [
//           'id',
//           'name',
//           'is_available',
//           'number_pieces',
//           'number_stock',
//           'price',
//           'composition',
//           'description',
//           'is_available',
//           {
//             sub_category: [
//               'name'
//             ]
//           },
//           {
//             preview_image: [
//               'id',
//               'filename_download',
//             ]
//           }
//         ],
//         limit: 2
//       }))
//     },
// )
</script>

<style scoped>

</style>