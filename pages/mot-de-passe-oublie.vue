<template>
  <main class="pt-14 pb-24 px-6">
    <section aria-labelledby="Mot de passe oublié" class="max-layout-lg-c-7-g-3 mx-auto">
      <h1 id="Mot de passe oublié" class="text-h2 text-brown-700 my-8 text-center uppercase">Mot de passe oublié</h1>
      <p class="text-center text-sm mb-8">Mot de passe oublié ? Saisissez votre e-mail pour recevoir un lien de
        réinitialisation
        et accéder à nouveau à nos chocolats d’exception.</p>
      <form @submit="submitForm" class="grid grid-cols-1 gap-6">
        <InputText type="email" input-id="email" name="email" placeholder="Votre adresse e-mail">
          <label for="email">Adresse e-mail*</label>
        </InputText>
        <button type="submit" class="btn w-fit">Connexion</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import ForgotPassword from "~/utils/forgot-password.schema";

const {$toast} = useNuxtApp()

const validationSchema = toTypedSchema(ForgotPassword)

const {values, handleSubmit} = useForm({
  validationSchema
})

const submitForm = handleSubmit(async (values) => {
  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: {
        email: values,
      },
    });

    if (response && response.status === 'error') {
      $toast.error(response.errorMessage)
    } else {
      $toast.success("Un e-mail vous a été envoyé")
    }

  } catch (e: any) {
    $toast.error('Une erreur est survenue')
  }
})
</script>

<style scoped>

</style>