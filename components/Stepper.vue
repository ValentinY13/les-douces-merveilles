<template>
  <ul class="w-full text-xl px-6 text-brown-700 text-center flex items-center pb-6">
    <li
        class="relative flex items-center justify-center border rounded-full w-[33px] h-[33px] after:content-['Date\00a0Pickup'] after:text-xs after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-6"
        :class="{'border-brown-700 bg-brown-700 text-white opacity-100 after:text-brown-700': step >= 0, 'border-brown-700 opacity-50': step < 0}"></li>
    <li class="h-px w-full"
        :class="{'bg-brown-700 opacity-100': step >= 1, 'bg-brown-700 opacity-50': step < 1}"></li>
    <li
        class="relative flex items-center justify-center border rounded-full w-[33px] h-[33px] after:content-['Paiement'] after:text-xs after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-6"
        :class="{'border-brown-700 bg-brown-700 text-white opacity-100 after:text-brown-700': step >= 1, 'border-brown-700 opacity-50': step < 1}"></li>
    <li class="h-px w-full"
        :class="{'bg-brown-700 opacity-100': step >= 2, 'bg-brown-700 opacity-50': step < 2}"></li>
    <li
        class="relative flex items-center justify-center border rounded-full w-[33px] h-[33px] after:content-['Confirmation'] after:text-xs after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-6"
        :class="{'border-brown-700 bg-brown-700 text-white opacity-100 after:text-brown-700': step >= 2, 'border-brown-700 opacity-50': step < 2}"></li>
  </ul>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  step?: number;
}>(), {
  step: -1
})
</script>

<style scoped>
ul {
  counter-reset: steps;
}

li:nth-child(odd) {
  flex: 0 0 33px;
}

li:nth-child(odd):before {
  counter-increment: steps;
  content: counter(steps) " ";
}
</style>