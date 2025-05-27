<template>
  <main class="pt-14 pb-24 px-6">
    <section aria-labelledby="Connexion" class="max-layout-lg-c-7-g-3 mx-auto">
      <h1 id="Connexion" class="text-h2 text-brown-700 my-8 text-center uppercase">Connexion</h1>
      <form @submit="submitForm" class="grid grid-cols-1 gap-6 text-sm">
        <InputText type="email" input-id="email" name="email" placeholder="Votre adresse e-mail">
          <label for="email">Adresse e-mail*</label>
        </InputText>
        <InputText :type="showInput ? 'text' : 'password'" input-id="password" name="password"
                   placeholder="Votre mot de passe" class="relative"
        >
          <label for="password">Mot de passe*</label>
          <span @click="showInput = !showInput"
                class="icon text-2xl absolute top-10.5 right-4 transform -translate-y-1/2 bg-brown-700 cursor pointer z-10"
                :class="showInput ? 'icon-eye-slash' : 'icon-eye'"></span>
        </InputText>
        <button type="submit" class="btn w-fit">Connexion</button>
        <p>Pas encore inscrit ?
          <nuxt-link to="/creation-de-compte" title="Créer un compte" class="underline">
            Créer un compte
          </nuxt-link>
        </p>
        <nuxt-link to="/mot-de-passe-oublie" title="Mot de passe oublié" class="underline w-fit">Mot de passe oublié
        </nuxt-link>

      </form>
      <div
          class="py-6 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-current before:me-6 after:flex-1 after:border-t after:border-current after:ms-6">
        Ou
      </div>
      <div class="btn btn-icon" @click="loginWithGoogle">
        <i class="icon-link icon-google text-xl"></i>
        <span>Connexion via google</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/yup'
import LoginSchema from "~/utils/login.schema";
import {useUserStore} from "~/store/user";

const {$directus, $toast, $readUsers} = useNuxtApp()

const userStore = useUserStore()
const showInput = ref(false)
const validationSchema = toTypedSchema(LoginSchema)

let loginAttempt = 0

const {values, handleSubmit} = useForm({
  validationSchema
})

const submitForm = handleSubmit(async (values) => {
  try {

    const data = await $directus.request($readUsers({
      fields: ['provider'],
      filter: {
        email: values.email
      }
    }))

    const user = data[0]

    if (user?.provider === 'google') {
      return $toast.error('Compte déjà associé avec Google, essayez cette méthode de connexion.')
    }

    await $directus.login(values.email, values.password)

    const loggedUser = await userStore.fetchUser()
    userStore.setUser(loggedUser)

    $toast.success('Vous êtes connecté')
    return navigateTo("/mon-compte");
  } catch (e) {
    loginAttempt++;

    if (loginAttempt === 3) {
      loginAttempt = 0
      return $toast.error('Trop de tentatives de connexion, le compte associé a été suspendu. Veuillez nous contacter pour le débloquer.')
    }

    // Vérifie si le compte est désormais suspendu
    const data = await $directus.request($readUsers({
      fields: ['status'],
      filter: {
        email: values.email
      }
    }));

    const user = data[0];
    if (user?.status === 'suspended') {
      return $toast.error('Compte suspendu, veuillez nous contacter pour le débloquer.');
    }

    // Gestion des erreurs
    if (e.errors[0]?.extensions?.code === 'INVALID_CREDENTIALS') {
      $toast.error('Adresse e-mail ou mot de passe incorrect');
    } else if (e.errors[0]?.extensions?.code === 'INVALID_PAYLOAD') {
      $toast.error('Champs invalides');
    } else {
      console.log(e);
      $toast.error('Une erreur est survenue.');
    }
  }
})

const loginWithGoogle = async () => {
  const directusUrl = useRuntimeConfig().public.directus.url
  const nuxtUrl = useRuntimeConfig().public.nuxtUrl
  try {
    window.location.href = `${directusUrl}/auth/login/google?redirect=${nuxtUrl}/se-connecter?auth=google`;
  } catch (e) {
    $toast.error('Une erreur est survenue, veuillez réessayer')
  }
};

onMounted(async () => {
  const {query} = useRoute();

  if (query.auth === 'google') {
    try {
      await navigateTo('/mon-compte', {replace: true})
      $toast.success('Vous êtes connecté')
    } catch (e) {
      $toast.error('Échec de l\'authentification Google')
    }
  }
})
</script>

<style scoped>

</style>
