<script setup lang="ts">
useRevealTransitionItems()

const values = [
  {
    url: "/img/valeur-1.jpg",
    description: "Nous réinventons avec modernité et délicatesse des créations inspirées des traditions orientales"
  },
  {
    url: "/img/valeur-2.jpg",
    description: "Le luxe se vit à travers l’émotion d’un parfum envoûtant, d’une texture fondante et de saveurs qui invitent au voyage"
  },
  {
    url: "/img/valeur-3.jpg",
    description: "Chaque chocolat est façonné à la main avec passion et précision, dans le respect d’un savoir-faire artisanal transmis de génération en génération"
  }
]

const teams = [
  {
    bottom: "/img/jane-bottom.jpg",
    top: "/img/jane-top.jpg",
  },
  {
    bottom: "/img/john-bottom.jpg",
    top: "/img/john-top.jpg",
  }
]
</script>

<template>
  <main class="pt-14 pb-24 lg:pb-0">
    <section aria-labelledby="à propos" class="px-6 responsive-layout grid md:grid-cols-2 gap-4 md:gap-16">
      <div class="space-y-4 mt-8">
        <h1 id="à propos" class="text-h2 font-medium uppercase reveal reveal-left-300">A propos de nous</h1>
        <h2 class="text-h2-play text-brown-700 reveal reveal-left-400">Lorem ipsum dolor solis</h2>
        <p class="reveal reveal-left-500">Lorem ipsum dolor sit amet consectetur. Nibh turpis sagittis lectus integer
          ullamcorper sit. Mattis cursus et
          commodo donec a nisl interdum. Sagittis non non netus morbi. Nisl eu varius eu arcu ultrices.</p>
        <p class="reveal reveal-left-600">Lorem ipsum dolor sit amet consectetur. Nibh turpis sagittis lectus integer
          ullamcorper sit. Mattis cursus et
          commodo donec a nisl interdum. Sagittis non non netus morbi. Nisl eu varius eu arcu ultrices.</p>
      </div>
      <nuxt-picture src="/img/about-us.jpg" class="max-w-[450px] reveal reveal-right-300"
                    :img-attrs="{class: 'object-cover size-full shadow-card border border-brown-700'}"></nuxt-picture>
    </section>
    <section class="py-24 px-6 responsive-layout" aria-labelledby="Valeurs">
      <TitleSection :title="'Nos valeurs'" :id="'Valeurs'"/>
      <div class="flex flex-wrap justify-between gap-4 lg:gap-0 pt-16">
        <CardAbout
            v-for="(value, i) in values"
            :key="value.url"
            :url="value.url"
            :description="value.description"
            class="max-w-[350px]"
            :class="`reveal reveal-bottom-${i}00`"
        />
      </div>
    </section>
    <section class="responsive-layout px-6" aria-labelledby="Equipe">
      <TitleSection :title="'Notre équipe'" :id="'Equipe'"/>
      <div class="grid grid-cols-1 md:grid-cols-2 items-center pt-16">
        <CardTeam
            :bottom="'/img/jane-bottom.jpg'"
            :top="'/img/jane-top.jpg'"
        />
        <div class="space-y-4">
          <h2 class="text-h2 uppercase reveal reveal-right-300">Jane Doe</h2>
          <h3 class="text-h2-play uppercase text-brown-700 font-medium reveal reveal-right-400">Fondatrice</h3>
          <p class="reveal reveal-right-500">Lorem ipsum dolor sit amet consectetur. Potenti commodo tortor egestas in
            lobortis velit. Habitant cursus
            tellus sit lobortis habitant pellentesque donec ut. Varius feugiat purus pharetra in porttitor praesent
            augue
            leo. Sit nisi auctor mauris at at dolor viverra augue.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 items-center md:items-start lg:items-center pt-16">
        <div class="space-y-4 pb-8">
          <h2 class="text-h2 uppercase reveal reveal-left-300">John Doe</h2>
          <h3 class="text-h2-play uppercase text-brown-700 font-medium reveal reveal-left-400">Maître chocolatier</h3>
          <p class="reveal reveal-left-500">Lorem ipsum dolor sit amet consectetur. Potenti commodo tortor egestas in
            lobortis velit. Habitant cursus
            tellus sit lobortis habitant pellentesque donec ut. Varius feugiat purus pharetra in porttitor praesent
            augue
            leo. Sit nisi auctor mauris at at dolor viverra augue.</p>
        </div>
        <div class="grid">
          <nuxt-picture src="/img/john-top.jpg"
                        class="reveal reveal-right-300"
                        :img-attrs="{class: 'object-cover size-full float-right shadow-card max-w-[200px] md:max-w-[250px] lg:max-w-[300px]'}"></nuxt-picture>
          <nuxt-picture src="/img/john-bottom.jpg"
                        class="reveal reveal-right-400"
                        :img-attrs="{class: 'object-cover size-full float-right -translate-y-1/4 sm:-translate-y-1/2 -translate-x-1/4 shadow-card max-w-[200px] md:max-w-[250px] lg:max-w-[300px]'}"></nuxt-picture>
        </div>
      </div>
    </section>

    <LayoutNewsletter/>

    <LayoutQualities/>
  </main>
</template>

<style scoped>

</style>