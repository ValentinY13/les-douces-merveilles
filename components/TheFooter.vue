<template>
  <footer class="bg-bg-secondary px-6 xl:px-16 pt-16 pb-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <nuxt-link to="/" title="Les Douces Merveilles"
                 class="mb-4 md:col-span-3 lg:col-span-1 xl:pl-16 ">
        <nuxt-img src="svg/logo.svg" alt="Les Douces Merveilles - Logo"
                  class="w-full max-w-[350px] h-12"></nuxt-img>
      </nuxt-link>
      <div class="xl:pl-16">
        <address>
          Pl. de l'Ecole des Cadets, 6 <br>
          5000 Namur
        </address>
        <nuxt-link to="tel:081222903"
                   class="block py-4 xl:py-8 transform transition-all duration-400 hover:-translate-y-1 hover:text-brown-700">
          081 22 29 03
        </nuxt-link>
        <p>
          Ouvert tous les jours 8h-18h.<br>
          Les dimanches et jours fériés 9h-12h.</p>
      </div>

      <ul class="space-y-4 xl:space-y-8 xl:pl-16">
        <li class="transform transition-all duration-400 hover:-translate-y-1 hover:text-brown-700">
          <nuxt-link to="/" title="Accueil">Accueil</nuxt-link>
        </li>
        <li class="transform transition-all duration-400 hover:-translate-y-1 hover:text-brown-700">
          <nuxt-link to="/nos-collections" title="Nos collections">Nos collections</nuxt-link>
        </li>
        <li class="transform transition-all duration-400 hover:-translate-y-1 hover:text-brown-700">
          <nuxt-link to="/a-propos" title="A propos">À propos</nuxt-link>
        </li>
        <li class="transform transition-all duration-400 hover:-translate-y-1 hover:text-brown-700">
          <nuxt-link to="/contact" title="Contact">Contact</nuxt-link>
        </li>
      </ul>

      <div class="flex gap-8 lg:col-end-4 xl:pl-16">
        <nuxt-link
            class="transform transition-all duration-400 hover:-translate-y-1 hover:text-brown-700"
            to="https://www.facebook.com/namurcadets" title="Facebook"
            rel="noopener" target="_blank" exertnal aria-label="Visitez notre page Facebook">
          <i class="icon-link icon-facebook text-2xl"></i>
        </nuxt-link>
        <nuxt-link
            class="transform transition-all duration-400 hover:-translate-y-1 hover:text-brown-700"
            to="https://www.instagram.com/namurcadets/" title="Instagram"
            rel="noopener" target="_blank" exertnal aria-label="Visitez notre page Instagram">
          <i class="icon-link icon-instagram text-2xl"></i>
        </nuxt-link>
      </div>
    </div>
    <div class="text-xs text-center mt-8 md:mt-12">
      <p class="inline-block">© Les Douces Merveilles {{ new Date().getFullYear() }} - Tous droits réservés -
        <nuxt-link to="/" title="Politique de confidentialité et gestion des cookies">
          Politique de confidentialité - Gestion des cookies
        </nuxt-link>
        -
        <nuxt-link to="/" title="Conditions générales de vente">Conditions générales de vente</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>