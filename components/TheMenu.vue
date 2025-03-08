<template>
  <header aria-label="Menu"
          class="z-40 fixed top-0 left-0 w-full">
    <nav aria-label="Menu header"
         class="bg-bg-primary flex justify-between items-center gap-x-5 absolute top-0 left-0 w-full py-2 md:py-4 px-6 md:px-12 transition-all duration-500 "
         :class="{'-translate-y-full' : !showTopMenu || isActive, 'shadow' :  !(!showTopMenu || isActive)}">

      <!--   Desktop links   -->
      <ul class="hidden lg:flex items-center gap-6">
        <li class="hidden lg:block">
          <nuxt-link to="/" title="Accueil">Accueil
          </nuxt-link>
        </li>
        <li class="hidden lg:block">
          <nuxt-link :to="{ path: '/nos-collections', query: { page: 1 } }" title="Nos collections">Nos Collections
          </nuxt-link>
        </li>
      </ul>
      <ul class="hidden lg:flex items-center gap-6">
        <li class="hidden lg:block">
          <nuxt-link to="/" title="A propos">A propos
          </nuxt-link>
        </li>

        <li class="hidden lg:block">
          <nuxt-link to="/" title="Contact">Contact
          </nuxt-link>
        </li>
        <nuxt-link to="/panier" title="Panier">
          <i class="icon-link icon-shopping-bag text-2xl"></i>
        </nuxt-link>
        <nuxt-link to="/se-connecter" title="Mon compte">
          <i class="icon-link icon-user text-2xl"></i>
        </nuxt-link>
      </ul>

      <!--   Mobile menu   -->
      <button aria-controls="menu-mobile" title="Ouvrir le menu" :aria-expanded="isActive"
              @click="handleClick"
              class="menu-hamburger lg:hidden">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nuxt-link to="/" title="Les Douces Merveilles"
                 class="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <nuxt-img src="svg/logo.svg" preload
                  class="w-full max-w-[350px] h-10 lg:h-12"></nuxt-img>
      </nuxt-link>

      <nuxt-link to="/panier" title="Panier" class="lg:hidden">
        <i class="icon-link icon-shopping-bag text-2xl"></i>
      </nuxt-link>
    </nav>

    <div @click="isActive = false"
         class="w-full h-full fixed top-0 left-0 z-30 pointer-events-none bg-opacity-50 transition-all duration-300"
         :class="{'backdrop-blur-sm pointer-events-auto!' : isActive}">
    </div>

    <!--  Mobile links  -->
    <nav
        id="menu-mobile"
        aria-label="Mobile navigation"
        class="bg-bg-primary transform transition duration-500 absolute top-0 w-full h-screen z-40 sm:max-w-[465px] lg:hidden"
        :class="{'-translate-y-full': !isActive, 'translate-y-0': isActive}"
    >
      <div
          class="w-full h-full overflow-y-auto menu-mobile__list flex flex-col gap-y-10 px-6 pt-6"
          :class="isActive ?  'menu-mobile__list--active' : 'menu-mobile__list--closed'">
        <button aria-controls="menu-mobile" title="Fermer le menu" @click="handleClick"
                class="menu-hamburger menu-hamburger--active">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul
            class="space-y-12 text-h3 text-center flex-grow flex flex-col justify-center uppercase">
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
    </nav>
  </header>
</template>

<script setup lang="ts">

const isActive = ref(false);

function handleClick() {
  isActive.value = !isActive.value;

  if (!isActive.value) {
    showSublistMobile.value = false;
  }
}

const {breakpoints} = useDefaultBreakpoints();

const isDesktop = breakpoints.greaterOrEqual('lg');

watch(isDesktop, (value: boolean) => {
  if (value)
    isActive.value = false;
})


watch(isActive, (value: boolean) => {
  if (value) {
    document.body.style.overflow = "clip";
  } else {
    document.body.style.overflow = "";
  }
})

const showSublistMobile = ref(false);

const {y} = useWindowScroll();

const showTopMenu = ref(true);
const scrolled = ref(false);

let lastScrollY = 0;

watch(y, (value) => {
  if (value <= 0) {
    showTopMenu.value = true;
  } else {
    showTopMenu.value = value <= lastScrollY;
  }

  scrolled.value = value > 0;

  lastScrollY = value;
});

onMounted(() => {
  scrolled.value = y.value > 0;
})

</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

.menu-hamburger {
  --menu-size: 30px;
  --bar-height: 2px;

  width: var(--menu-size);
  height: var(--menu-size);

  @apply relative cursor-pointer;

  span {
    height: var(--bar-height);
    @apply block w-full bg-brown-700 absolute transition ease-in-out duration-500;
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