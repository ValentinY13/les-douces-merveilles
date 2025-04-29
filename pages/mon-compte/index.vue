<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import RegisterSchema from "~/utils/register.schema";

const {$logout} = useNuxtApp();

const showInput = ref(false)
const showInputConf = ref(false)
const validationSchema = toTypedSchema(RegisterSchema)

const {values, handleSubmit} = useForm({
  validationSchema
});

const submitForm = handleSubmit(async (values) => {
  // try {
  //   const response = await $fetch('/api/auth/register', {
  //     method: 'POST',
  //     body: values
  //   })
  //
  //   if (response && response.status === 'error') {
  //     $toast.error(response.errorMessage)
  //   } else {
  //     $toast.success("Merci pour votre inscription ! Un e-mail de confirmation vous a été envoyé")
  //   }
  //
  // } catch (e) {
  //   $toast.error('Une erreur est survenue')
  // }
})
</script>

<template>
  <main class="px-6 pt-14 pb-24">
    <section aria-labelledby="header" class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <AccountMenu class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4"/>
        <BackButton class="py-12 md:pt-0" title="Retour">
          <h1 id="header" class="text-h2 uppercase text-brown-700">Information du compte</h1>
        </BackButton>
      </div>
    </section>
    <section class="responsive-layout">
      <form @submit="submitForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputText type="text" input-id="lastname" name="lastname" placeholder="Votre nom">
          <label for="lastname">Nom*</label>
        </InputText>

        <InputText type="text" input-id="firstname" name="firstname" placeholder="Votre prénom">
          <label for="lastname">Prénom*</label>
        </InputText>

        <InputText type="text" input-id="email" name="email" placeholder="Votre adresse e-mail">
          <label for="lastname">Adresse mail*</label>
        </InputText>

        <InputCheckbox class="md:col-span-3 w-fit" :checked-value="true" name="newsletter">
          Inscription à la newsletter
        </InputCheckbox>

        <button type="submit" class="btn w-fit">Enregistrer modification</button>
      </form>
    </section>
    <section aria-labelledby="modification" class="responsive-layout">
      <h2 id="modification" class="text-h2 pt-24 pb-12 uppercase text-brown-700">Accès au compte</h2>

      <form class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <InputText :type="showInput ? 'text' : 'password'" input-id="password" name="password"
                   placeholder="Votre mot de passe"
                   class="relative">
          <label for="password">Mot de passe*</label>
          <span @click="showInput = !showInput"
                class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
                :class="showInput ? 'icon-eye-slash' : 'icon-eye'"></span>
        </InputText>

        <InputText :type="showInputConf ? 'text' : 'password'" input-id="confPassword" name="confPassword"
                   placeholder="Votre mot de passe"
                   class="relative lg:col-start-1">
          <label for="confPassword">Confirmation mot de passe*</label>
          <span @click="showInputConf = !showInputConf"
                class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
                :class="showInputConf ? 'icon-eye-slash' : 'icon-eye'"></span>
        </InputText>

        <button type="submit" class="btn w-fit lg:col-start-1">Changer le mot de passe</button>
      </form>
    </section>

    <section aria-labelledby="compte" class="responsive-layout">
      <h2 id="compte" class="text-h2 pt-24 pb-12 uppercase text-brown-700">Gestion du compte</h2>
      <div class="flex flex-col sm:flex-row gap-6">
        <button class="btn btn-red w-fit">Supprimer mon compte</button>
        <button class="btn w-fit" @click="$logout()">Déconnexion</button>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>