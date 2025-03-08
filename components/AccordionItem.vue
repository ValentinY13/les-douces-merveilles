<template>
  <div class="border-b overflow-hidden">
    <button
        class="w-full flex justify-between items-center p-4 transition-all cursor-pointer"
        @click="isOpen = !isOpen"
    >
      <span class="text-sm text-left font-medium uppercase">{{ title }}</span>
      <i class="icon icon-simple-chevron text-2xl transition-transform duration-300"
         :class="isOpen ? '-rotate-90' : 'rotate-0'"></i>
    </button>
    <div
        class="grid transition-all duration-300 ease-in-out"
        :class="isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0 py-0'"
    >
      <div class="overflow-hidden px-6 text-sm" v-html="content"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
});

const isOpen = ref(false);
</script>