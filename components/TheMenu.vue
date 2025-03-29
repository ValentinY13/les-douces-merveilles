<script setup lang="ts">
const isActive = ref(false)

function handleClick(): void {
  isActive.value = !isActive.value
}

function closeMenu(): void {
  isActive.value = false
}

const {y} = useWindowScroll()

const showTopMenu = ref(true)
const scrolled = ref(false)

// watch for scroll direction and hide menu if scrolling down; show if scrolling up or at top
watch(y, (value, oldValue) => {
  showTopMenu.value = !(value > 100 && value > oldValue);
  scrolled.value = y.value > 100;
});
</script>

<template>
  <header class="sticky z-50 top-0 left-0 w-full" :class="{'pointer-events-none':!showTopMenu && !isActive}">
    <div class="transition-transform duration-500" :class="{'-translate-y-full' : !showTopMenu}">

      <div class="bg-bg-primary flex justify-between px-6 py-4 md:py-6 shadow">
        <nav class="hidden lg:block">
          <ul class="flex items-center gap-6">
            <li>
              <nuxt-link to="/" title="Accueil">Accueil</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ path: '/nos-collections', query: { page: 1 } }" title="Nos collections">Nos
                Collections
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <nuxt-link to="/" title="Les Douces Merveilles"
                   class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <nuxt-img src="svg/logo.svg" preload
                    class="w-full max-w-[350px] h-10 "></nuxt-img>
        </nuxt-link>

        <div class="flex items-center">
          <nav class="hidden lg:block" aria-label="Desktop menu">
            <ul class="lg:flex items-center gap-6">
              <li>
                <nuxt-link to="/date-click-and-collect" title="A propos">A propos</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/" title="Contact">Contact</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/panier" title="Panier">
                  <i class="icon-link icon-shopping-bag text-2xl"></i>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/se-connecter" title="Mon compte">
                  <i class="icon-link icon-user text-2xl"></i>
                </nuxt-link>
              </li>
            </ul>
          </nav>

          <button type="button"
                  class="menu-hamburger lg:hidden"
                  aria-controls="menu-mobile"
                  title="Ouvrir le menu"
                  :aria-expanded="isActive"
                  @click="handleClick">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <nuxt-link to="/panier" title="Panier" class="lg:hidden">
          <i class="icon-link icon-shopping-bag text-2xl"></i>
        </nuxt-link>
      </div>
    </div>

    <!-- Mobile menu -->
    <nav
        class="transition-all transition-discrete duration-300 opacity-0 invisible fixed left-0 top-0 size-full bg-white overflow-y-auto menu-mobile__list"
        :class="{'opacity-100 visible': isActive}"
        aria-label="Mobile Menu">
      <div :class="isActive ?  'menu-mobile__list--active' : 'menu-mobile__list--closed'">
        <ul class="text-h3 flex flex-col items-center justify-center gap-12 h-screen">
          <li>
            <nuxt-link @click="handleClick" to="/" title="Accueil">Accueil</nuxt-link>
          </li>

          <li>
            <nuxt-link @click="handleClick" :to="{ path: '/nos-collections', query: { page: 1 } }"
                       title="Nos collections">Nos collections
            </nuxt-link>
          </li>

          <li>
            <nuxt-link @click="handleClick" to="/" title="A propos">à propos</nuxt-link>
          </li>

          <li>
            <nuxt-link @click="handleClick" to="/se-connecter" title="Mon compte">Mon compte</nuxt-link>
          </li>

          <li>
            <nuxt-link @click="handleClick" to="/" title="Contact" class="btn">Contact</nuxt-link>
          </li>
        </ul>
      </div>
      <button type="button"
              class="menu-hamburger menu-hamburger--active !absolute z-50 top-6 left-6"
              aria-controls="menu-mobile"
              title="Ouvrir le menu"
              :aria-expanded="isActive"
              @click="handleClick">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.menu-hamburger {
  --menu-size: 24px;
  --bar-height: 1px;

  width: var(--menu-size);
  height: var(--menu-size);

  @apply relative cursor-pointer;

  span {
    height: var(--bar-height);
    @apply block w-full bg-brown-700 absolute transition ease-in-out duration-500 rounded-xs;
  }

  span:first-child {
    top: calc((var(--menu-size) / 2) - (var(--bar-height) / 2) - (var(--menu-size) / 3))
  }

  span:nth-child(2) {
    top: calc((var(--menu-size) / 2) - (var(--bar-height) / 2))
  }

  span:last-child {
    top: calc((var(--menu-size) / 2) - (var(--bar-height) / 2) + (var(--menu-size) / 3))
  }
}

.menu-hamburger.menu-hamburger--active {

  span:first-child {
    @apply rotate-45;
    @apply translate-y-[calc(var(--menu-size)_/_3)];
  }

  span:nth-child(2) {
    opacity: 0;
  }

  span:last-child {
    @apply -rotate-45;
    @apply -translate-y-[calc(var(--menu-size)_/_3)];
  }
}

.menu-mobile__list ul li, .menu-mobile__list div:last-child {
  opacity: 0;
  transition: opacity .8s;
}

.menu-mobile__list--active ul li, .menu-mobile__list--active div:last-child {
  opacity: 1;
}

.menu-mobile__list--closed ul li, .menu-mobile__list--closed div:last-child {
  opacity: 0;
  transition: none;
}

.menu-mobile__list--active li:nth-child(1) {
  transition-delay: .2s;
}

.menu-mobile__list--active li:nth-child(2) {
  transition-delay: .3s;
}

.menu-mobile__list--active li:nth-child(3) {
  transition-delay: .4s;
}

.menu-mobile__list--active li:nth-child(4) {
  transition-delay: .5s;
}

.menu-mobile__list--active li:nth-child(5) {
  transition-delay: .6s;
}

.menu-mobile__list--active div:last-child {
  transition-delay: 1s;
}
</style>