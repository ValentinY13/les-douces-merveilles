<script setup lang="ts">
import TimePicker from "~/components/TimePicker.vue";
import {useCartStore} from "~/store/cart";
import {useUserStore} from "~/store/user";
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup'

const {$directus, $readItems, $toast, $isAuthenticated} = useNuxtApp()
const time_slots = ref([]);
const allSlots = ref<{ startTime: string, endTime: string, disabled: boolean, id: string }[]>([]);
const selectedDate = ref();
const selectedSlot = ref()

const {data: settings} = await useAsyncData('settings', async () => {
      return $directus.request($readItems('pickup_settings', {
        fields: [
          'max_orders_per_day',
          'max_orders_per_slot'
        ],
      }))
    },
    {
      transform: (data) => {
        if (!Array.isArray(data) || !data[0]) return null;

        return data[0];
      }
    }
)

const {data: slotsData} = await useAsyncData('time_slots', async () => {
  return $directus.request($readItems('time_slots', {
    fields: [
      'id',
      'start_time',
      'end_time',
    ]
  }))
})
if (slotsData.value) {
  slotsData.value.map((item) => {
    allSlots.value.push({
      startTime: item.start_time.split(':')[0] + 'h',
      endTime: item.end_time.split(':')[0] + 'h',
      disabled: false,
      id: item.id,
    })
  })
  time_slots.value = slotsData.value;
}

const maxOrdersPerSlot = settings.value?.max_orders_per_slot;

const handleDateSelected = async (date: string) => {
  selectedDate.value = date;
  selectedSlot.value = null;

  const ordersSelect = await $directus.request($readItems('orders', {
    fields: [
      'id',
      'pickup_date',
      {
        pickup_time_slot: ['*']
      }
    ],
    aggregate: {count: 'pickup_time_slot'},
    groupBy: ['pickup_time_slot', 'pickup_date'],
    filter: {
      pickup_date: {
        _eq: selectedDate.value,
      }
    }
  }))

// Comptage des commandes par slot
// renvoie un objet avec en clé l'id du créneau et en valeur la quantité de commandes pour ce créneau
  const slotCounts = ordersSelect.reduce((acc, order) => {
    const slotId = order.pickup_time_slot;
    acc[slotId] = (acc[slotId] || 0) + order.count.pickup_time_slot;
    return acc;
  }, {});

  allSlots.value = time_slots.value.map(slot => {
    const startTime = slot.start_time.split(':')[0] + 'h'
    const endTime = slot.end_time.split(':')[0] + 'h'
    return {startTime, endTime, disabled: (slotCounts[slot.id] || 0) >= maxOrdersPerSlot, id: slot.id}
  })
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit', year: 'numeric'});
};

const {values, handleSubmit} = useForm({
  validationSchema: yup.object({
    cgv: yup.boolean().oneOf([true], '').required('Le champ condition générale de vente est obligatoire')
  })
})

const handleCheckout = handleSubmit(async () => {
  const cartStore = useCartStore();
  const response = await useCheckStock();

  if (response.status !== 'success') {
    navigateTo('/panier')
    $toast.error('Le panier contient des erreurs');
    return
  }

  const userStore = useUserStore()
  const user = await userStore.fetchUser()

  if (!user) {
    navigateTo('/panier')
    $toast.error('Vous devez être connecté');
    return
  }

  try {
    const response = await $fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: {
        products: cartStore.cartStorage,
        slotId: selectedSlot.value.id,
        date: selectedDate.value,
        userId: user.id
      }
    })

    navigateTo(response.url, {
      external: true
    })

    if (response && response.status === 'error') {
      $toast.error(response.errorMessage)
    } else {
      $toast.success("Panier valide")
    }
  } catch (e) {
    console.log(e)
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
        <Stepper class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4" :step="1"/>
        <BackButton class="py-12 md:pt-8" title="Retour">
          <h1 class="text-h2 uppercase text-brown-700">Date et heure de retrait</h1>
        </BackButton>
      </div>

      <div class="flex flex-col gap-12 sm:flex-row md:justify-center lg:justify-evenly">
        <TimePicker @date-selected="handleDateSelected" :max-orders-per-day="settings?.max_orders_per_day"
                    class="sm:block! md:max-w-[350px] lg:justify-self-end"/>

        <div
            class="flex flex-wrap md:grid md:grid-cols-2 justify-center content-center gap-6">
          <button
              class="btn h-fit"
              :class="{ 'btn-selected': selectedSlot?.id === slot.id }"
              v-for="slot in allSlots"
              :key="slot.id"
              :disabled="slot.disabled"
              @click="selectedSlot = { startTime: slot.startTime, endTime: slot.endTime, disabled: slot.disabled,id: slot.id }"
          >
            {{ slot.startTime }} - {{ slot.endTime }}
          </button>
        </div>

      </div>
      <Transition name="fade">
        <div v-if="selectedDate && selectedSlot">
          <p

              class="pt-12 text-sm text-center sm:col-span-2">
            Votre commande sera prête le
            <span class="font-semibold text-brown-700">{{ formatDate(selectedDate) }}</span>
            entre <span class="font-semibold text-brown-700">{{ selectedSlot.startTime }} - {{
              selectedSlot.endTime
            }}</span>.
            Afin d’éviter au mieux l’attente, merci de respecter votre créneau horaire.
          </p>
          <form @submit="handleCheckout" class="flex flex-col items-center ">
            <InputCheckbox class="py-6" :checked-value="true" name="cgv">
              J'ai lu et j'accepte les
              <nuxt-link to="/" class="text-brown-700 font-medium">conditions générales de ventes*</nuxt-link>
            </InputCheckbox>
            <button type="submit" class="btn w-fit" @click="handleCheckout">Procéder au paiement</button>
          </form>
        </div>
      </Transition>
    </section>
  </main>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
