<script setup lang="ts">
import {useCartStore} from "~/store/cart";

const {$isAuthenticated, $directus, $readItems, $triggerFlow} = useNuxtApp();

const cartStore = useCartStore();
const user = await $isAuthenticated();

onBeforeMount(() => {
  cartStore.resetCart()
})

const {data: order} = await useAsyncData('orders', async () => {
      return $directus.request($readItems('orders', {
        fields: [
          'pickup_date',
          'pickup_time_slot',
          'total',
          'user',
          {
            order_lines: [
              'price',
              'quantity',
              'sub_total',
              {
                product: [
                  'name',
                ]
              }
            ]
          }
        ],
        filter: {
          user: user.id
        },
        sort: ['-date_created'],
        limit: 1
      }))
    }, {
      transform: (response: any) => {
        return response[0]
      }
    }
)


onMounted(async () => {
  if (order) {
    const response = await $directus.request($triggerFlow('POST', '7a8fdda3-69b0-48e4-b26b-c4f986197ddc', order.value))
  }
})


</script>

<template>
  <main class="px-6 pt-14 pb-24">
    <section class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <Stepper class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4" :step="3"/>
        <BackButton class="py-12 md:pt-8" title="Retour">
          <h1 class="text-h2 uppercase text-brown-700">Confirmation</h1>
        </BackButton>
      </div>
      <pre>{{ order }}</pre>

    </section>
  </main>
</template>

<style scoped>

</style>