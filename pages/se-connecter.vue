<template>
  <main>
    <section aria-labelledby="Connexion" class="py-24 px-6 max-layout-lg-c-7-g-3 mx-auto">
      <h1 id="Connexion" class="text-h2 text-brown-700 my-8 text-center uppercase">Connexion</h1>
      <form @submit="submitForm" class="grid grid-cols-1 gap-6">
        <InputText type="email" input-id="email" name="email" placeholder="Votre adresse e-mail">
          <label for="email">Adresse e-mail*</label>
        </InputText>
        <InputText :type="showInput ? 'text' : 'password'" input-id="password" name="password"
                   placeholder="Votre mot de passe" class="relative"
        >
          <label for="password">Mot de passe*</label>
          <span @click="showInput = !showInput"
                class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
                :class="showInput ? 'icon-eye-slash' : 'icon-eye'"></span>
        </InputText>
        <button type="submit" class="btn w-fit">Connexion</button>
        <p>Pas encore inscrit ?
          <nuxt-link to="/creation-de-compte" title="Créer un compte" class="underline">
            Créer un compte
          </nuxt-link>
        </p>
        <nuxt-link to="/mot-de-passe-oublie" title="Mot de passe oublié" class="underline">Mot de passe oublié
        </nuxt-link>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import LoginSchema from "~/utils/login.schema";

const {$directus, $toast} = useNuxtApp()

const showInput = ref(false)
const validationSchema = toTypedSchema(LoginSchema)

const {values, handleSubmit} = useForm({
  validationSchema
})

const submitForm = handleSubmit(async (values) => {
  try {
    await $directus.login(values.email, values.password)
    $toast.success('Vous êtes connecté')
    navigateTo("/");
  } catch (e) {
    if (e.errors[0].extensions.code === 'INVALID_CREDENTIALS') {
      $toast.error('Adresse e-mail ou mot de passe incorrect')
    } else if (e.errors[0].extensions.code === 'INVALID_PAYLOAD') {
      $toast.error('Champs invalides')
    } else {
      $toast.error('Une erreur est survenue.')
    }
  }
})
</script>

<style scoped>

</style>
