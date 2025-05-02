<template>
  <div>
    <NuxtLayout>
      <NuxtRouteAnnouncer/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/store/cart";
import {useUserStore} from "~/store/user";

const cartStore = useCartStore()
const userStore = useUserStore()

onMounted(async () => {
  await cartStore.fetchCart();
  await userStore.initSession()

});

useHead({
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "512x512",
      href: "/app-web.png"
    },
    {
      rel: "icon",
      sizes: "32x32",
      href: "/favicon.ico"
    },
    {
      rel: "icon",
      sizes: "48x48",
      href: "/favicon-w48.ico"
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg"
    },
  ]
})

useServerSeoMeta({
  ogSiteName: 'Les Douces Merveilles',
  ogImage: '/social-media.jpg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageType: 'image/jpeg',
  twitterImage: '/social-media.jpg',
  twitterCard: 'summary',
  formatDetection: 'telephone=no',
  ogType: "website",
  themeColor: "#000000",
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.5rem);
}
</style>
