<template>
  <main>
    <section aria-labelledby="Nouveau mot de passe" class="py-24 px-6 max-layout-lg-c-7-g-3 mx-auto">
      <h1 id="Nouveau mot de passe" class="text-h2 text-brown-700 my-8 text-center uppercase">Choisissez votre nouveau
        mot de
        passe</h1>
      <form @submit="submitForm" class="grid grid-cols-1 gap-6">

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
                   class="relative">
          <label for="confPassword">Confirmation mot de passe*</label>
          <span @click="showInputConf = !showInputConf"
                class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
                :class="showInputConf ? 'icon-eye-slash' : 'icon-eye'"></span>
        </InputText>

        <button type="submit" class="btn w-fit">Envoyer</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import ResetPassword from "~/utils/reset-password.schema";

const showInput = ref(false)
const showInputConf = ref(false)
const {$toast} = useNuxtApp()

const route = useRoute();
const token = route.query.token;

const validationSchema = toTypedSchema(ResetPassword)

const {values, handleSubmit} = useForm({
  validationSchema
})

const submitForm = handleSubmit(async (values) => {
  try {
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        values,
        token
      },
    });

    if (response && response.status === 'error') {
      $toast.error(response.errorMessage)
    } else {
      $toast.success("Mot de passe réinitialisé avec succès, redirection en cours ...")
      setTimeout(() => {
        navigateTo('/account/login');
      }, 3000);
    }

  } catch (e: any) {
    $toast.error('Une erreur est survenue')
  }
})
</script>

<style scoped>

</style>