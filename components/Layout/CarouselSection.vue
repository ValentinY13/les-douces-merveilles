<template>
  <section class="py-24">
    <slot name="header"></slot>

    <div class="px-6 overflow-hidden">
      <div class="responsive-layout">
        <swiper-container ref="swiperElement" init="false">
          <slot name="slides"></slot>
        </swiper-container>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {SwiperOptions} from "swiper/types";

const {swiperOverflowVisible} = useTwSwiper();

const swiperElement = ref()

const swiperOptions: SwiperOptions = {
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  autoHeight: true,
  injectStyles: [swiperOverflowVisible(),
    `
    .swiper {
      padding: 64px 0
    }

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
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 'auto'
    }
  }
}

onMounted(() => {
  Object.assign(swiperElement.value, swiperOptions);
  swiperElement.value.initialize();
})
</script>

<style scoped>


</style>