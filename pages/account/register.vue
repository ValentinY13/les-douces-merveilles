<template>
  <main>
    <section aria-labelledby="Inscription" class="responsive-layout">
      <h1 id="Inscription" class="text-h2 text-brown-700 text-center my-8 uppercase">Création de compte</h1>
      <form @submit="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText type="text" input-id="lastname" name="lastname" placeholder="Votre nom">
          <label for="lastname">Nom*</label>
        </InputText>

        <InputText type="text" input-id="firstname" name="firstname" placeholder="Votre prénom">
          <label for="firstname">Prénom*</label>
        </InputText>

        <InputText type="email" input-id="email" name="email" placeholder="Votre adresse e-mail" class="lg:row-start-2">
          <label for="email">Adresse e-mail*</label>
        </InputText>

        <InputText :type="showInput ? 'text' : 'password'" input-id="password" name="password"
                   placeholder="Votre mot de passe"
                   class="lg:row-start-3 relative">
          <label for="password">Mot de passe*</label>
          <span @click="showInput = !showInput"
                class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
                :class="showInput ? 'icon-eye-slash' : 'icon-eye'"></span>
        </InputText>

        <InputText :type="showInputConf ? 'text' : 'password'" input-id="confPassword" name="confPassword"
                   placeholder="Votre mot de passe"
                   class="lg:row-start-3 relative">
          <label for="confPassword">Confirmation mot de passe*</label>
          <span @click="showInputConf = !showInputConf"
                class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
                :class="showInputConf ? 'icon-eye-slash' : 'icon-eye'"></span>
        </InputText>

        <InputCheckbox class="md:col-span-2 w-fit" :checked-value="true" name="confidentiality">
          J’accepte les
          <nuxt-link to="/" title="Conditions générales de vente"
                     class="text-brown-700 font-medium">conditions générales de vente
          </nuxt-link>
          et la
          <nuxt-link to="/" title="Politique de confidentialité"
                     class="text-brown-700 font-medium">politique de confidentialité*
          </nuxt-link>
        </InputCheckbox>

        <InputCheckbox class="md:col-span-2 w-fit" :checked-value="true" name="newsletter">
          Inscription à la newsletter
        </InputCheckbox>

        <button type="submit" class="btn w-fit">Envoyer</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import RegisterSchema from "~/utils/register.schema";

const {$toast} = useNuxtApp()

const showInput = ref(false)
const showInputConf = ref(false)
const validationSchema = toTypedSchema(RegisterSchema)

const {values, handleSubmit} = useForm({
  validationSchema
});

const submitForm = handleSubmit(async (values) => {
  try {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: values
    })

    if (response && response.status === 'error') {
      $toast.error(response.errorMessage)
    } else {
      $toast.success("Merci pour votre inscription ! Un e-mail de confirmation vous a été envoyé")
    }

  } catch (e) {
    $toast.error('Une erreur est survenue')
  }
})
</script>

<style scoped>

</style>