<script lang="ts" setup>
const route = useRoute()

const title = computed(() => {
  if (!route.meta.title)
    return 'Les Douces Merveilles';

  if (typeof route.meta.title === 'string') {
    return route.meta.title;
  }

  if (typeof route.meta.title === 'function') {
    return route.meta.title();
  }

  return 'Les Douces Merveilles';
});

const description = computed(() => route.meta.description || null);

useSeoMeta({
  title,
  ogTitle: title,
  twitterTitle: title,
  description,
  ogDescription: description,
  twitterDescription: description,
});

</script>

<template>
  <div class="overflow-hidden !overflow-clip">
    <TheMenu/>
    <slot/>
    <TheFooter/>
  </div>
</template>