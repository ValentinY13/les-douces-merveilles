<script setup lang="ts">

</script>

<template>
  <main class="pt-14 pb-24 px-6">
    <section aria-labelledby="Contact" class="responsive-layout">
      <h1 id="Connexion" class="text-h2 text-brown-700 my-8 text-center uppercase">Contact</h1>
      <div class="grid md:grid-cols-3 gap-8">
        <ul class="space-y-6 text-sm">
          <li class="space-x-4">
            <i class="icon icon-building text-brown-700 text-2xl"></i>
            <address class="inline-block">Pl. de l’Ecole des Cadets, 6 <br>
              5000 Namur
            </address>
          </li>
          <li class="space-x-4 inline-flex">
            <i class="icon icon-phone text-brown-700 text-2xl"></i>
            <nuxt-link href="tel:081222903">
              081 22 29 03
            </nuxt-link>
          </li>
          <li class="space-x-4 flex items-center">
            <i class="icon icon-calendar text-brown-700 text-2xl"></i>
            <p>Ouvert tous les jours 8h-18h. <br>
              Les dimanches et jours fériés 9h-12h
            </p>
          </li>
        </ul>
        <form @submit="handleSubmit" class="text-sm space-y-6 md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4">
          <InputSelectForm ref="inputSelect" placeholder="Sujet de la demande" label="test"
                           :options="[{value: 'test', label: 'Test'}]"
                           name="subject_select">
            <template #default>Sujet de la demande*</template>
          </InputSelectForm>
          <InputText type="text" input-id="lastname" name="lastname" placeholder="Votre Nom">
            <label for="lastname">Nom*</label>
          </InputText>
          <InputText type="text" input-id="firstname" name="firstname" placeholder="Votre prénom">
            <label for="firstname">Prénom*</label>
          </InputText>
          <InputText type="email" input-id="email" name="email" placeholder="Votre adresse e-mail">
            <label for="email">Adresse e-mail*</label>
          </InputText>
          <InputTextArea label="Votre message" type="text" placeholder="Votre message" input-id="message"
                         name="message" class="lg:col-span-2">
            <template #default class="pb-3">Message*</template>
          </InputTextArea>
          <button type="submit" class="btn w-fit">Envoyer</button>
        </form>

        <aside class="w-full h-[345px] md:col-span-3">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10158.690207313735!2d4.8672644648673!3d50.4658220042202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c19911762f411d%3A0x3730fdb0385bc55e!2sEAFC%20NAMUR-CADETS!5e0!3m2!1sfr!2sbe!4v1746724240688!5m2!1sfr!2sbe"
              width="100%" height="100%" style="border:0;" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>