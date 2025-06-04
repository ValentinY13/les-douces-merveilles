<template>
  <main class="pt-14 pb-24 px-6">
    <section class="max-layout-xl-c-12-g-13 mx-auto text-center">
      <h1 class="text-h2 text-brown-700 my-8 uppercase">Page de vérification</h1>

      <transition name="fade">
        <h2 v-if="isVerified" class="text-h2 py-6">
          Inscription réussie !
        </h2>
      </transition>

      <transition name="fade" appear>
        <p v-if="showRedirectMessage" class="text-lg">
          Vous allez être redirigé vers la page de connexion...
        </p>
      </transition>

      <transition name="fade">
        <div v-if="hasError">
          <h2 class="text-h2 py-6">Erreur de vérification de l'adresse mail</h2>
          <p>Le lien est peut-être expiré veuillez réessayer</p>
          <nuxt-link to="/" title="Retour à l'accueil" class="btn mt-6">Retour à l'accueil</nuxt-link>
        </div>
      </transition>
    </section>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const token = route.query.token;

if (!token) {
  navigateTo('/')
}

const isVerified = ref(false);
const showRedirectMessage = ref(false);
const hasError = ref(false);

definePageMeta({
  layout: 'verify',
})

const verifyToken = async () => {
  try {
    await $fetch("/api/auth/verify", {query: {token}});
    isVerified.value = true;

    setTimeout(() => {
      showRedirectMessage.value = true;

      setTimeout(async () => {
        return navigateTo('/se-connecter', {replace: true, external: true});
      }, 3000);
    }, 1000);
  } catch (e) {
    hasError.value = true;
  }
};

onMounted(() => {
  if (token) verifyToken();
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
