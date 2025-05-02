<script setup lang="ts">
import {useUserStore} from "~/store/user";

const {$directus, $readItems} = useNuxtApp()

const userStore = useUserStore()
const user = await userStore.fetchUser()

const {data} = await useAsyncData('orders_history', async () => {
  return $directus.request($readItems('orders', {
    fields: [
      'id',
      'order_number',
      'pickup_date',
      {
        pickup_time_slot: [
          '*'
        ]
      },
      'status',
      'total',
      'user'
    ],
    filter: {
      user: {
        _eq: user.id
      }
    }
  }))
}, {
  transform: (orders) => {
    return orders.map(order => ({
      ...order,
      pickup_date: new Intl.DateTimeFormat('fr-BE', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(order.pickup_date))
    }))
  }
})

definePageMeta({
  middleware: "auth"
})

</script>

<template>
  <main class="px-6 pt-14 pb-24">
    <section aria-labelledby="header" class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <AccountMenu class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4"/>
        <BackButton class="py-12 md:pt-0" title="Retour">
          <h1 id="header" class="text-h2 uppercase text-brown-700">Mes commandes</h1>
        </BackButton>
      </div>
    </section>
    <section>
      <table class="w-full text-xs" v-if="data.length" ref="container">
        <thead class="hidden lg:table-header-group text-left text-brown-700">
        <tr>
          <th class="py-4 w-1/5 lg:pl-12 group">Numéro de commande</th>
          <th class="w-1/5 group">Statut</th>
          <th class="w-1/5 group">Date de retrait</th>
          <th class="w-1/5 group">Heure de retrait</th>
          <th class="w-1/5 group">Montant total</th>
          <th class="w-1/5 min-w-[300px] group">Actions</th>
        </tr>
        </thead>
        <tbody class="lg:table-row-group">
        <tr class="grid grid-cols-2 lg:table-row p-6 space-y-4 odd:bg-brown-700/10 even:bg-white"
            v-for="order in data">
          <td class="block lg:table-cell lg:pl-12 lg:py-4">
            <span class="block opacity-50 pb-2 lg:hidden">Numéro de commande :</span>
            {{ order.order_number.split('-').slice(0, 2).join('-') }}
          </td>
          <td class="block lg:table-cell">
            <span class="block opacity-50 pb-2 lg:hidden">Statut :</span>
            {{ order.status }}
          </td>
          <td class="block lg:table-cell">
            <span class="block opacity-50 pb-2 lg:hidden">Date de retrait :</span>
            {{ order.pickup_date }}
          </td>
          <td class="block lg:table-cell">
            <span class="block opacity-50 pb-2 lg:hidden">Heure de retrait :</span>
            entre {{ order.pickup_time_slot.start_time.split(':')[0] + 'h' }} et
            {{ order.pickup_time_slot.end_time.split(':')[0] + 'h' }}
          </td>
          <td class="block lg:table-cell">
            <span class="block opacity-50 pb-2 lg:hidden">Montant total :</span>
            {{ order.total }}€
          </td>
          <td class="col-span-2 flex flex-col gap-4 items-center md:flex-row md:justify-center lg:justify-start lg:py-4 lg:pr-12">
            <nuxt-link class="btn btn-small w-full" to="/">Modifier</nuxt-link>
            <nuxt-link class="btn btn-small w-full" to="/">Voir détails</nuxt-link>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>Aucune commande pour le moment</div>
    </section>
  </main>
</template>

<style scoped>

</style>