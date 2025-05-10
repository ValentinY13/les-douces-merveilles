<template>
  <section aria-labelledby="newsletter" class="bg-bg-secondary py-24 px-6">
    <div class="responsive-layout">
      <TitleSection :title="title" :color="'grey'" :id="'newsletter'"/>
      <form @submit.prevent="submitForm"
            class="relative flex justify-between my-8 md:w-1/2 mx-auto reveal reveal-right-400">
        <InputText type="email" input-id="emailNews" name="emailNews" placeholder="Votre adresse e-mail"
                   class="w-full"
        >
        </InputText>
        <button type="submit" class="absolute top-3 right-0 px-2">OK</button>
      </form>
      <p class="text-sm text-center reveal reveal-right-500">En vous inscrivant, vous acceptez notre politique de
        confidentialité.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup'

const title = "Inscription à notre newsletter"

const {values, resetForm, handleSubmit} = useForm({
  validationSchema: toTypedSchema(yup.object({
    emailNews: yup.string().email('Le champ e-mail doit être une adresse mail valide').required('Le champ e-mail est obligatoire'),
  }))
})

const submitForm = handleSubmit((values) => {
  console.log(values)
})

</script>

<style scoped>

</style>