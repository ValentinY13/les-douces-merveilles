<script setup lang="ts">
import {useCartStore} from "~/store/cart";
import {useUserStore} from "~/store/user";

const {$directus, $readItems, $triggerFlow} = useNuxtApp();

const cartStore = useCartStore();

const userStore = useUserStore()
const user = await userStore.fetchUser()

onBeforeMount(() => {
  cartStore.resetCart()
})

const {data: order} = await useAsyncData('orders', async () => {
      return $directus.request($readItems('orders', {
        fields: [
          'order_number',
          'pickup_date',
          {
            pickup_time_slot: [
              'start_time',
              'end_time',
            ]
          },
          'total',
          'date_created',
          // {
          //   user: [
          //     'id',
          //     'email'
          //   ]
          // },
          // {
          //   order_lines: [
          //     'price',
          //     'quantity',
          //     'sub_total',
          //     {
          //       product: [
          //         'name',
          //       ]
          //     }
          //   ]
          // }
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

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <main class="px-6 pt-14 pb-24">
    <section class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <Stepper class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4" :step="3"/>
        <BackButton class="py-12 md:pt-8">
          <h1 class="text-h2 uppercase text-brown-700">Confirmation</h1>
        </BackButton>
      </div>
      <h2 class="text-h3 text-center mt-6">Merci pour votre commande !</h2>
      <p class="text-center py-4">Un e-mail de confirmation vous a été envoyé.</p>

      <div class="bg-white shadow-card mt-6 p-6 max-w-[430px] md:max-w-[600px] mx-auto">
        <ul class="space-y-6">
          <li>
            Numéro de commande :
            <span class="block sm:float-right text-brown-700 font-medium">
            {{ order.order_number.split('-').slice(0, 2).join('-') }}
          </span>
          </li>
          <li>
            Date de commande :
            <span class="block sm:float-right text-brown-700 font-medium">{{
                formatPickupDate(order.date_created)
              }}</span>
          </li>
          <li>
            Date de retrait :
            <span class="block sm:float-right text-brown-700 font-medium">{{
                formatPickupDate(order.pickup_date)
              }}</span>
          </li>
          <li>
            Heure de retrait :
            <span class="block sm:float-right text-brown-700 font-medium">
              entre
              {{ order.pickup_time_slot.start_time.split(':')[0] + 'h' }}
              et
              {{ order.pickup_time_slot.end_time.split(':')[0] + 'h' }}
            </span>
          </li>
          <li>
            Total : <span class="block sm:float-right text-brown-700 font-medium">{{ order.total }}€</span>
          </li>
        </ul>
        <div class="flex flex-col gap-4 sm:flex-row justify-between mt-4">
          <nuxt-link to="/" role="button" title="Accueil" class="btn">Accueil</nuxt-link>
          <nuxt-link to="/mon-compte/historique-de-commande" role="button" title="Voir ma commande" class="btn">Voir
            ma
            commande
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>
