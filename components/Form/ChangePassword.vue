<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import ChangePassword from "~/utils/change-password"
import type {DirectusUsers} from "~/types";

const {$directus, $updateUser, $toast, $isAuthenticated} = useNuxtApp();

const props = defineProps<{
  user: DirectusUsers
}>()

const user = props.user

const showInput = ref(false)
const showInputNew = ref(false)
const validationChangePasswordSchema = toTypedSchema(ChangePassword)

const {
  handleSubmit: handleSubmitPassword,
  values: passwordValues,
} = useForm({
  validationSchema: validationChangePasswordSchema
})

const submitPasswordForm = handleSubmitPassword(async (values) => {

  try {
    await $directus.request(
        $updateUser(user.id, {
          password: values.newPassword,
        })
    );

    $toast.success("Votre compte a bien été modifié !");

  } catch (e) {
    $toast.error("Erreur lors du changement de mot de passe");
  }
})
</script>

<template>
  <form @submit="submitPasswordForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
    <InputText :type="showInput ? 'text' : 'password'" input-id="password" name="password"
               placeholder="Votre mot de passe"
               class="relative">
      <label for="password">Mot de passe actuel*</label>
      <span @click="showInput = !showInput"
            class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
            :class="showInput ? 'icon-eye-slash' : 'icon-eye'"></span>
    </InputText>

    <InputText :type="showInputNew ? 'text' : 'password'" input-id="newPassword" name="newPassword"
               placeholder="Votre mot de passe"
               class="relative lg:col-start-1">
      <label for="newPassword">Nouveau mot de passe*</label>
      <span @click="showInputNew = !showInputNew"
            class="icon text-2xl absolute bottom-0 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
            :class="showInputNew ? 'icon-eye-slash' : 'icon-eye'"></span>
    </InputText>

    <button type="submit" class="btn w-fit lg:col-start-1">Changer le mot de passe</button>
  </form>
</template>

<style scoped>

</style>