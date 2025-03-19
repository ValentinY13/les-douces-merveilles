<template>
  <div class="lg:flex gap-6">
    <!-- Miniatures -->
    <div class="flex flex-col gap-4">
      <div
          v-for="(image, index) in images"
          :key="index"
          class="w-16 xl:w-24 h-16 xl:h-24 border border-brown-700 p-0.5 cursor-pointer"
          @click="selectedImage = image"
      >
        <nuxt-picture
            provider="directus"
            :alt="image.directus_files_id.filename_download"
            :src="getImageSrc(image)"
            :img-attrs="{ class: 'w-full h-full object-cover' }"
        >
        </nuxt-picture>
      </div>
    </div>

    <!--    w-96 h-96 xl:w-full xl:h-full-->
    <!-- Grande image avec transition -->
    <div class="w-96 h-96 xl:size-full max-w-[500px] max-h-[500px] xl:aspect-square relative">
      <transition name="fade" mode="out-in">
        <nuxt-picture
            :key="selectedImage.directus_files_id.id"
            preload
            :alt="selectedImage.directus_files_id.filename"
            provider="directus"
            :src="getImageSrc(selectedImage)"
            :img-attrs="{ class: 'w-full h-full object-cover' }"
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
