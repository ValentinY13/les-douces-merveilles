<template>
  <div class="flex items-center justify-between gap-6 py-2 px-4 w-fit border border-brown-100 text-brown-700">
    <button @click="decrease" aria-label="Augmenter la quantité">
      <i class="icon-link icon-minus text-2xl cursor-pointer"></i>
    </button>
    <span>{{ quantity }}</span>
    <button @click="increase" aria-label="Diminuer la quantité">
      <i class="icon-link icon-plus text-2xl cursor-pointer"></i>
    </button>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  productName: string
  max?: number;
}>(), {
  max: 5
})
const {$toast} = useNuxtApp()
const quantity = ref(1)

function increase() {
  if (quantity.value < props.max) {
    quantity.value++
  } else {
    $toast.error(`La quantité maximum autorisée pour ${props.productName} est ${props.max}`)
  }
}

function decrease() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

</script>

<style scoped>

</style>