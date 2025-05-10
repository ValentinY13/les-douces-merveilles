<script setup lang="ts">
defineProps<{
  bottom: string;
  top: string;
}>()
</script>

<template>
  <div class="grid lg:grid-cols-2">
    <nuxt-picture :src="top"
                  :class="`reveal reveal-left-300`"
                  :img-attrs="{class: 'object-cover size-full shadow-card max-w-[200px] md:max-w-[250px] lg:max-w-[350px]'}"></nuxt-picture>
    <nuxt-picture :src="bottom"
                  :class="`reveal reveal-left-400`"
                  :img-attrs="{class: 'object-cover -translate-y-1/4 sm:-translate-y-1/2 translate-x-1/4 lg:-translate-x-1/4 lg:translate-y-1/4 size-full shadow-card max-w-[200px] md:max-w-[250px] lg:max-w-[350px]'}"></nuxt-picture>
  </div>
</template>

<style scoped>

</style>