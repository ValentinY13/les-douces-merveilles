<template>
  <div>
    <swiper-container ref="swiperElement" init="false">
      <swiper-slide v-for="item in items.slides" :key="item.id" class="relative h-dvh lg:h-[90dvh]">
        <nuxt-picture
            preload
            provider="directus"
            :src="`${item.product.images[0].directus_files_id?.id}/${item.product.images[0].directus_files_id?.filename_download}`"
            :img-attrs="{ class: 'w-full h-full object-cover' }"
        >
        </nuxt-picture>
        <div data-swiper-parallax="-200"
             class="absolute bottom-0 left-0 w-full lg:w-fit lg:max-w-xl min-h-[40dvh] flex flex-col items-center lg:items-start  justify-center gap-6 px-6 lg:px-12 xl:px-16 py-4 lg:py-8 xl:py-12 pb-12 text-brown-700 text-center lg:text-left bg-bg-opacity">
          <h2 data-swiper-parallax="-100" class="text-h3 uppercase">{{ item.title }}</h2>
          <h1 data-swiper-parallax="-200" class="text-h1-play">{{ item.product.name }}</h1>
          <nuxt-link data-swiper-parallax="-200" to="/" class="btn w-fit">COMMANDER</nuxt-link>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import type {SwiperOptions} from "swiper/types";
import type {BlockHeader} from "~/types"

defineProps<{
  items: BlockHeader;
}>()

const swiperElement = ref();

const swiperOptions: SwiperOptions = {
  spaceBetween: 0,
  slidesPerView: 1,
  grabCursor: true,
  parallax: true,
  injectStyles: [
    `
    .swiper-pagination-bullet {
      --swiper-pagination-bullet-inactive-opacity: 0.4;
      --swiper-pagination-bullet-inactive-color: lch(82.76% 0 139.09);
    }

    .swiper-pagination-bullet-active {
      --swiper-pagination-color: lch(34.5% 24.09 53.33);
    }
      `
  ],
  pagination: {
    clickable: true
  }
}

onMounted(() => {
  Object.assign(swiperElement.value, swiperOptions);
  swiperElement.value.initialize();
})

</script>

<style scoped>

</style>