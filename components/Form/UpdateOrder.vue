<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/yup";
import * as yup from 'yup'

const {$directus, $readItems, $toast} = useNuxtApp()

const props = defineProps<{
  pickup_date: string,
  pickup_time: Object,
  order_id: number,
  order_number: string
}>()

const date = ref(new Date(props.pickup_date));
const inputSelect = useTemplateRef('inputSelect')

const matchingSlot = computed(() => {
  return allSlots.value.find(slot =>
      slot.startTime === props.pickup_time.start_time.split(':')[0] + 'h' &&
      slot.endTime === props.pickup_time.end_time.split(':')[0] + 'h'
  );
});

const initialValue = computed(() => matchingSlot.value?.id || null);

onMounted(() => {
  if (matchingSlot.value) {
    inputSelect.value.setValue(matchingSlot.value.id);
  }
});

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

const time_slots = ref([]);
const allSlots = ref<{ startTime: string, endTime: string, disabled: boolean, id: string }[]>([]);

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
        _eq: date,
      }
    }
  }))

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

const time_slot = computed(() =>
    allSlots.value
        .filter(slot => !slot.disabled)
        .map(slot => ({
          value: slot.id,
          label: `entre ${slot.startTime} et ${slot.endTime}`,
        }))
)

const {values, handleSubmit} = useForm({
  validationSchema: toTypedSchema(yup.object({
    time_slot_select: yup.string().required(),
  }))
})

const submitForm = handleSubmit(async (values) => {

  const response = await $fetch('/api/updateOrder', {
    method: 'POST',
    body: {
      order_id: props.order_id,
      date: date.value,
      time_slot_id: values.time_slot_select,
      cancel_order: values.cancel,
    }
  })
  if (response && response.status === 'error') {
    $toast.error(response.errorMessage)
  } else {
    $toast.success(response.errorMessage)
    await refreshNuxtData()
  }

})
</script>

<template>
  <div class="p-6 relative">
    <h2 class="text-h3 text-brown-700">Modifier commande</h2>
    <p class="py-6">N° {{ order_number.split('-').slice(0, 2).join('-') }}</p>
    <form @submit="submitForm" class="grid grid-cols-1 gap-6">

      <div>
        <p class="text-xs pb-2">Date de retrait</p>
        <TimePicker
            @date-selected="handleDateSelected"
            :max-orders-per-day="settings?.max_orders_per_day" v-model="date"/>
      </div>

      <div>
        <p class="text-xs pb-2">Heure de retrait</p>
        <InputSelect ref="inputSelect" placeholder="Sélectionner" :options="time_slot" :value="initialValue"
                     name="time_slot_select"></InputSelect>
      </div>
      <InputCheckbox :checked-value="true" name="cancel">
        <span class="text-sm">Annuler ma commande et être remboursé (action définitive)</span>
      </InputCheckbox>
      <button type="submit" class="btn btn-small w-fit justify-self-end">Enregistrer</button>
    </form>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>