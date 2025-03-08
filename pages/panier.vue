<template>
  <main>
    <section class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <Stepper class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4" :step="0"/>
        <BackButton class="py-12 md:pt-8" title="Panier"/>
      </div>
      <CardCartItem
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :class="index === products.length - 1 ? 'border-b border-grey-100' : ''"
      />
      <p class="py-12 text-h3 text-right tracking-wide">Total TVAC: <span
          class="text-brown-700 font-medium">100.00€</span></p>
      <div class="text-center">
        <nuxt-link title="Valider le panier" to="/" class="btn">Valider le panier</nuxt-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">

const {$directus, $readItems} = useNuxtApp()

const {data: products} = await useAsyncData('product-details', async () => {
      return $directus.request($readItems('product', {
        fields: [
          'id',
          'name',
          'is_available',
          'number_pieces',
          'number_stock',
          'price',
          'composition',
          'description',
          'is_available',
          {
            sub_category: [
              'name'
            ]
          },
          {
            preview_image: [
              'id',
              'filename_download',
            ]
          }
        ],
        limit: 2
      }))
    },
)
</script>

<style scoped>

</style>