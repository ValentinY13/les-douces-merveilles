<template>
  <div class="flex items-center justify-between gap-6 py-2 px-4 w-fit border border-brown-100 text-brown-700"
       :class="isAvailable ? '' : 'cursor-not-allowed opacity-50'">
    <button :disabled="!isAvailable" @click="decrease" aria-label="Augmenter la quantité">
      <i class="icon-link icon-minus text-2xl cursor-pointer"></i>
    </button>
    <span>{{ quantity }}</span>
    <button :disabled="!isAvailable" @click="increase" aria-label="Diminuer la quantité">
      <i class="icon-link icon-plus text-2xl cursor-pointer"></i>
    </button>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  productName: string
  initialQuantity?: number
  max: number;
  canRemove?: boolean
  isAvailable?: boolean
}>(), {
  initialQuantity: 1,
  canRemove: false,
  isAvailable: true,
})

const emit = defineEmits(["update:quantity"]);

const {$toast} = useNuxtApp()
const quantity = ref(props.initialQuantity)

function increase() {
  if (quantity.value < props.max) {
    quantity.value++
    emit("update:quantity", quantity.value);
  } else {
    $toast.error(`La quantité maximum autorisée pour ${props.productName} est ${props.max}`)
  }
}

function decrease() {
  if (quantity.value > (props.canRemove ? 0 : 1)) {
    quantity.value--;
    emit("update:quantity", quantity.value);
  }
}

</script>

<style scoped>

</style>