<template>
  <div id="Error">
    <nuxt-picture alt="" :img-attrs="{class: 'absolute object-cover left-0 top-0 w-full h-full'}"
                  src="/error.jpg"></nuxt-picture>
    <div class="container">
      <div class="wrapper">
        <template v-if="error?.statusCode === 404">
          <h1 class="text-h2">Page introuvable</h1>
          <p class="mt-4">La page que vous recherchez est introuvable.</p>

          <button @click="handleError" class="btn mt-6">
            Retour à l'accueil
          </button>
        </template>

        <template v-else-if="error?.statusCode === 503">
          <h1 class="text-h2">Nous nous mettons à jour pour mieux vous servir !</h1>

          <p class="mt-4" v-for="(item, i) in errorsMaintenance" :key="i">{{ item }}</p>
        </template>

        <template v-else>
          <h1 class="text-h2">Oups</h1>
          <p class="mt-4">Une erreur est survenue. Revenez plus tard.</p>

          <button @click="handleError" class="btn mt-6">
            Retour à l'accueil
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {NuxtError} from "#app";

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => {
  clearError({redirect: '/'});
}

const errorsMaintenance = [
  "Notre site web fait actuellement l'objet d'une maintenance programmée",
  "Nous travaillons dur pour améliorer votre expérience en ligne. Pendant cette période, certaines fonctionnalités peuvent être temporairement indisponibles",
  "Nous vous remercions de votre patience et de votre compréhension",
  "La mise en ligne officielle est prévue ce jeudi 23.01 à partir de 21h !",
]

</script>

<style scoped>

@reference 'tailwindcss';

#Error {
  @apply min-h-screen w-full text-center relative text-black flex justify-center items-center py-12;
}

.wrapper {
  padding: 40px 20px;
}

.wrapper {
  @apply min-h-0;
}

.container {
  @apply relative bg-white shadow rounded-sm left-0 right-0 m-auto top-0 bottom-0 flex flex-col flex-wrap justify-center items-center;
  max-width: 796px;
  width: 90%;
}

h1 {
  margin-bottom: 20px;
}

p {
  @apply mx-auto;
  max-width: 60ch;
  margin-bottom: 10px;
}

.browser-wrapper {
  @apply flex justify-between;
  max-width: 390px;
  margin: 30px auto;
}

.browser-wrapper a {
  @apply block;
  width: 100px;
}

.browser-wrapper img {
  max-height: 80px;
}

.social-media {
  @apply flex mx-auto justify-between items-center;
  max-width: 120px;
  margin-bottom: 40px;
}

.social-media a {
  @apply block;
  width: 25px;
}

.social-media img {
  max-height: 25px;
}

picture.logo {
  @apply mx-auto;
  width: 180px;
  margin-bottom: 20px;
}

img {
  @apply w-full;
}

a {
  font-size: 1.3em;
}

h1 {
  margin-top: 0
}
</style>