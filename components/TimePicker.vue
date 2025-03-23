<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps<{
  maxOrdersPerDay: number;
}>()

const {$directus, $readItems} = useNuxtApp()
const date = ref()

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1); // Demain

const oneMonthLater = new Date(today);
oneMonthLater.setMonth(today.getMonth() + 1); // 1 mois après aujourd'hui

const {data: orders} = await useAsyncData('orders', async () => {
  return $directus.request($readItems('orders', {
    fields: [
      'id',
      'pickup_date',
      'pickup_time_slot'
    ],
    aggregate: {count: '*'},
    groupBy: ['pickup_date'],
    filter: {
      pickup_date: {
        _gte: tomorrow.toISOString().split('T')[0], // -> "2025-03-23T14:30:00.000Z" to 2025-03-23
        _lte: oneMonthLater.toISOString().split('T')[0]
      }
    }
  }))
})

const {data: unavailable_dates} = await useAsyncData('unavailable_dates', async () => {
  return $directus.request($readItems('unavailable_dates', {
    fields: [
      'date',
      'end_date'
    ]
  }))
})

const disabledDates = computed(() => {
  let dates = [] as Date[];

  // bloquer les dates non disponible
  unavailable_dates.value?.forEach(range => {
    let currentDate = new Date(range.date);

    if (!range.end_date) {
      dates.push(new Date(currentDate))
    } else {
      let endDate = new Date(range.end_date);

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  });

  // bloquer dates si le max est atteint
  orders.value?.forEach(order => {
    order.count >= props.maxOrdersPerDay ? dates.push(order.pickup_date) : '';
  })

  return dates;
});

// const selectedDate = ref(null);
const emit = defineEmits(["date-selected"]);

const updateDate = (newDate: string) => {
  // selectedDate.value = newDate;
  emit("date-selected", newDate.split('T')[0]);
}
</script>

<template>

  <VueDatePicker
      @update:modelValue="updateDate"
      hide-offset-dates
      :enable-time-picker="false"
      inline
      auto-apply
      disable-year-select
      utc
      :min-date="tomorrow"
      :max-date="oneMonthLater"
      prevent-min-max-navigation
      :disabled-dates="disabledDates"
      locale="fr"
      :day-names="['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim']"
  />
</template>

<style scoped>

</style>