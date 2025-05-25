<script setup lang="ts">
const props = defineProps<{
  order_number: string
}>()

const {$directus, $readItems} = useNuxtApp()

const {data: order, status} = await useAsyncData('order-details', async () => {
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
          {
            user: ['email']
          },
          {
            order_lines: [
              {
                product: ['name']
              },
              'quantity',
              'sub_total',
            ]
          },
          'total',
          'date_created',
        ],
        filter: {
          order_number: props.order_number
        }
      }))
    },
    {
      transform: (response: any) => {
        return response[0];
      }
    }
)
</script>

<template>
  <div class="p-6 relative">
    <h2 class="text-h3 text-brown-700">Récapitulatif de la commande</h2>
    <p class="py-6">N° {{ order_number.split('-').slice(0, 2).join('-') }}</p>

    <div v-if="status === 'pending'" class="flex justify-center py-10">
      <Spinner class="size-6"/>
    </div>

    <ul v-else class="space-y-6">
      <li>
        Date de commande :
        <span class="block sm:float-right text-brown-700 font-medium">
          {{ formatPickupDate(order.date_created) }}
        </span>
      </li>
      <li>
        Date de retrait :
        <span class="block sm:float-right text-brown-700 font-medium">
          {{ formatPickupDate(order.pickup_date) }}
        </span>
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
        Récapitulatif :
        <ul v-for="line in order.order_lines" :key="line.product.name">
          <li class="flex justify-between py-0.5">
            {{ line.product.name }} X {{ line.quantity }}
            <span class="text-brown-700 font-medium">Sous total : {{ line.sub_total }}€</span>
          </li>
        </ul>
      </li>
      <li>
        Total : <span class="block sm:float-right text-brown-700 font-medium">{{ order.total }}€</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>