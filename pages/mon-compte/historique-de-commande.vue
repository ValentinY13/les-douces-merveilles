<script setup lang="ts">
import {useUserStore} from "~/store/user";

const {$directus, $readItems} = useNuxtApp()

const userStore = useUserStore()
const user = await userStore.fetchUser()

const limit = ref(8)
const isActive = ref(false)
const ordersSection = ref<HTMLElement | null>(null)

const statusTranslations = {
  pending: 'En cours',
  completed: 'Récupérée',
  refund: 'Remboursée',
  expired: 'Expirée'
}

const {data, refresh} = await useAsyncData('orders_history', async () => {
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
        },
        limit: limit.value,
        sort: '-pickup_date'
      }))
    },
    {
      transform: (orders) => {
        return orders.map(order => {
          order.status = statusTranslations[order.status] || order.status
          return order
        })
      }
    }
)

const seeMore = () => {
  if (!isActive.value) {
    limit.value = -1
  } else {
    limit.value = 8
  }
  isActive.value = !isActive.value
  refresh()
}

watch(isActive, (newValue) => {
  if (!newValue && ordersSection.value) {
    ordersSection.value.scrollIntoView({behavior: "smooth"});
  }
})

definePageMeta({
  middleware: "auth"
})

</script>

<template>
  <main class="px-6 pt-14 pb-24">
    <section aria-labelledby="header" ref="ordersSection" class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <AccountMenu class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4"/>
        <BackButton class="py-12 md:pt-0">
          <h1 id="header" class="text-h2 uppercase text-brown-700">Mes commandes</h1>
        </BackButton>
      </div>
      <p class="pb-6 text-sm max-layout-lg-c-5-g-4">**Les commandes peuvent être modifiées ou annulées jusqu'à 48 heures
        avant la date de retrait. Passé ce délai, aucune modification ou remboursement ne pourra être effectué.
        <nuxt-link to="/" title="Plus d'information" class="font-medium text-brown-700"> Plus d'information ici.
        </nuxt-link>
      </p>
    </section>
    <section>
      <div v-if="data.length">
        <table class="w-full text-xs" ref="container">
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
              {{ formatPickupDate(order.pickup_date) }}
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
              <PopupLayout>
                <template #activator="{togglePopup}">
                  <button :disabled="order.status !== 'En cours'" @click="togglePopup" title="Modifier commande"
                          class="btn btn-small w-full lg:w-fit">
                    Modifier
                  </button>
                </template>

                <template #default="{togglePopup}">
                  <PopupCard>
                    <FormUpdateOrder :order_id="order.id" :pickup_date="order.pickup_date"
                                     :order_number="order.order_number"
                                     :pickup_time="order.pickup_time_slot">
                      <button @click="togglePopup" class="btn btn-small btn-red absolute bottom-6 left-6">Annuler
                      </button>
                    </FormUpdateOrder>
                  </PopupCard>
                </template>
              </PopupLayout>

              <PopupLayout>
                <template #activator="{togglePopup}">
                  <button @click="togglePopup" title="Voir détails" class="btn btn-small w-full lg:w-fit">
                    Voir détails
                  </button>
                </template>

                <template #default="{togglePopup}">
                  <PopupCard>
                    <CardInfoOrder :order_number="order.order_number"/>
                    <button @click="togglePopup" class="btn btn-small btn-red ml-6 mb-6">
                      Fermer
                    </button>
                  </PopupCard>
                </template>
              </PopupLayout>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="text-center" v-if="data.length > 7">
          <button class="btn mt-6" @click="seeMore">
            {{ isActive ? 'Afficher moins' : 'Afficher plus' }}
          </button>
        </div>
      </div>
      <div v-else class="responsive-layout">Aucune commande pour le moment...</div>
    </section>
  </main>
</template>

<style scoped>

</style>
