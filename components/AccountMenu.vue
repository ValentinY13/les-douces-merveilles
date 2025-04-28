<script>
</script>

<template>
  <nav aria-label="menu profil" class="h-fit">
    <ul class="relative text-sm text-brown-700 grid gap-layout-xs-g grid-cols-2 justify-between after:rounded-4xl after:absolute after:-bottom-3 after:h-[3px] after:w-full after:bg-brown-700 after:opacity-50">
      <li class="relative">
        <nuxt-link
            custom
            v-slot="{href, route, navigate, isActive, isExactActive}"
            to="/mon-compte"
            class="after:rounded-4xl after:absolute after:-bottom-3 after:h-[3px] after:w-full after:z-10 after:left-0"
            title="Information du compte">
          <a :href="href" :class="isExactActive ? ['after:bg-brown-700', 'text-brown-700'] : ['opacity-50']"
             @click="navigate">Information
            du compte</a>
        </nuxt-link>
      </li>
      <li class="relative">
        <nuxt-link
            custom
            v-slot="{href, route, navigate, isActive, isExactActive}"
            to="/mon-compte/historique-de-commande"
            class="after:rounded-4xl after:absolute after:-bottom-3 after:h-[3px] after:w-full after:z-10 after:left-0"
            title="Historique de commande">
          <a :href="href" :class="isExactActive ? ['after:bg-brown-700', 'text-brown-700'] : ['opacity-50']"
             @click="navigate">Historique
            de commande</a>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
