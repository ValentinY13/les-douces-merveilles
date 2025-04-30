<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/yup";
import UpdateUserSchema from "~/utils/update-user.schema";

const {$directus, $updateUser, $toast, $logout} = useNuxtApp();
const validationUpdateUserSchema = toTypedSchema(UpdateUserSchema)

const {
  handleSubmit: handleSubmitUpdateUser,
  values: profileValues,
} = useForm({
  validationSchema: validationUpdateUserSchema
});

const user = {
  email: "test4@mail.com",
  lastname: "Doe",
  firstname: "John",
  newsletter: false
}

const isModified = () => {
  return (
      user.email !== profileValues.email ||
      user.lastname !== profileValues.lastname ||
      user.firstname !== profileValues.firstname ||
      user.newsletter === !profileValues.newsletter
  )
}

const submitUpdateForm = handleSubmitUpdateUser(async (values) => {
  if (!isModified()) {
    $toast.info("Aucun champs n'a été modifié");
    return;
  }

  const emailChanged = values.email !== user.email;

  try {
    await $directus.request(
        $updateUser('11548cf8-60e2-4772-ac89-0d5d9c141463', {
          last_name: values.lastname,
          first_name: values.firstname,
          email: values.email,
        })
    );

    if (emailChanged) {
      $logout()
      await navigateTo("/se-connecter?info=email-updated", {replace: true});
    }

    $toast.success("Votre compte a bien été modifié !");
  } catch (e) {
    $toast.error("Erreur lors de la modification de votre compte");
  }
});
</script>

<template>
  <form @submit="submitUpdateForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
</template>

<style scoped>

</style>