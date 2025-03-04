<template>
  <section aria-labelledby="newsletter" class="bg-bg-secondary py-24 px-6">
    <TitleSection :title="title" :color="'grey'" :id="'newsletter'"/>
    <form @submit.prevent="submitForm" class="relative flex justify-between my-8 md:w-1/2 mx-auto">
      <InputText type="email" input-id="email" name="email" placeholder="Votre adresse e-mail" class="w-full"
      >
      </InputText>
      <button type="submit" class="absolute top-3 right-0 px-2">OK</button>
    </form>
    <p class="text-sm text-center">En vous inscrivant, vous acceptez notre politique de confidentialité.</p>
  </section>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup'

const title = "Inscription à notre newsletter"

const {values, resetForm, handleSubmit} = useForm({
  validationSchema: toTypedSchema(yup.object({
    email: yup.string().email('Le champ e-mail doit être une adresse mail valide').required('Champ obligatoire'),
  }))
})

const submitForm = handleSubmit((values) => {
  console.log(values)
})

</script>

<style scoped>

</style>