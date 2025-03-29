<template>
  <div>
    <swiper-container ref="swiperElement" init="false">
      <swiper-slide v-for="item in items.slides" :key="item.id" class="relative h-[80dvh] lg:h-[70dvh] xl:h-[60dvh]">
        <nuxt-picture
            preload
            provider="directus"
            :alt="item.product.name"
            :src="`${item.product.preview_image.id}/${item.product.preview_image.filename_download}`"
            :img-attrs="{ class: 'size-full object-cover' }"
        >
        </nuxt-picture>
        <div
            data-swiper-parallax="-200"
            class="absolute bottom-0 left-0 w-full lg:w-fit lg:max-w-1/3 text-center lg:text-left space-y-4 px-6 lg:px-12 xl:px-16 pt-4 md:pt-6 lg:py-8 xl:py-12 pb-12 text-brown-700 bg-bg-opacity">
          <h2 data-swiper-parallax="-100" class="text-h3">{{ item.title }}</h2>
          <h1 data-swiper-parallax="-200" class="text-h1-play">{{ item.product.name }}</h1>
          <nuxt-link data-swiper-parallax="-200" title="Commander"
                     :to="`/nos-collections/${item.product.sub_category.slug}/${item.product.slug}`" class="btn w-fit">
            Commander
          </nuxt-link>
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