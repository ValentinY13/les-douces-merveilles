<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import ChangePassword from "~/utils/reset-password.schema"

const showInput = ref(false)
const showInputConf = ref(false)
const validationChangePasswordSchema = toTypedSchema(ChangePassword)

const {
  handleSubmit: handleSubmitPassword,
  values: passwordValues,
} = useForm({
  validationSchema: validationChangePasswordSchema
})

const submitPasswordForm = handleSubmitPassword(async (values) => {

  try {
    console.log(values)
  } catch (e) {

  }
})
</script>

<template>
  <form @submit="submitPasswordForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
</template>

<style scoped>

</style>