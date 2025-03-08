<template>
  <div class="lg:flex gap-6">
    <!-- Miniatures -->
    <div class="flex flex-col gap-4">
      <div
          v-for="(image, index) in images"
          :key="index"
          class="w-16 h-16 border border-brown-700 p-0.5 cursor-pointer"
          @click="selectedImage = image"
      >
        <nuxt-picture
            provider="directus"
            :src="getImageSrc(image)"
            :img-attrs="{ class: 'w-full h-full object-cover' }"
        >
        </nuxt-picture>
      </div>
    </div>

    <!-- Grande image avec transition -->
    <div class="w-96 h-96 relative">
      <transition name="fade" mode="out-in">
        <nuxt-picture
            :key="selectedImage.directus_files_id.id"
            preload
            provider="directus"
            :src="getImageSrc(selectedImage)"
            :img-attrs="{ class: 'w-full h-full object-cover absolute top-0 left-0' }"
        >
        </nuxt-picture>
      </transition>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  images: Array
});

const selectedImage = ref(props.images[0]);

const getImageSrc = (image) => {
  return `${image.directus_files_id.id}/${image.directus_files_id?.filename_download}`;
};
</script>

<style scoped>
/* Animation de fondu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
