<script setup lang="ts">

</script>

<template>
  <main class="px-6 pt-14 pb-24">
    <section class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <Stepper class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4" :step="0"/>
        <BackButton class="py-12 md:pt-8" title="Retour">
          <h1 class="text-h2 uppercase text-brown-700">Identification</h1>
        </BackButton>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <BasketLogin class="bg-white shadow-card p-6"/>
        <BasketRegister class="bg-white shadow-card p-6"/>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>