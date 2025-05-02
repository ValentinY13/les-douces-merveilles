<script setup lang="ts">
import {useUserStore} from "~/store/user";

const {$toast, $directus, $createItem, $triggerFlow} = useNuxtApp();
const userStore = useUserStore()

const logout = async () => {
  await userStore.logout();
  $toast.success('Vous êtes déconnecté')
  return navigateTo('/')
}

const user = await userStore.fetchUser()

async function handleDelete() {
  const id = "ac7e3995-df66-4838-b743-4ae386cd5fe1"

  try {
    const response = await $directus.request($createItem('account_deletion_requests', {
      user: id,
      status: 'pending'
    }))
    const responseTrigger = await $directus.request($triggerFlow('POST', 'ec2192ff-c652-40b1-8790-99190b5e48da', {
      user: {
        last_name: "doe",
        first_name: "john",
        email: "doe@doe.com",
      }
    }))

  } catch (e) {
    console.log(e)
  }
}

definePageMeta({
  middleware: ["auth"]
})
</script>

<template>
  <main class="px-6 pt-14 pb-24">
    <section aria-labelledby="header" class="responsive-layout">
      <div class="md:grid md:grid-cols-3">
        <AccountMenu class="md:order-2 md:col-span-2 lg:col-span-1 lg:col-end-4"/>
        <BackButton class="py-12 md:pt-0" title="Retour">
          <h1 id="header" class="text-h2 uppercase text-brown-700">Information du compte</h1>
        </BackButton>
      </div>
    </section>
    <section class="responsive-layout">
      <FormUpdateUser :user="user"/>
    </section>
    <section aria-labelledby="modification" class="responsive-layout">
      <h2 id="modification" class="text-h2 pt-24 pb-12 uppercase text-brown-700">Accès au compte</h2>
      <FormChangePassword :user="user"/>
    </section>

    <section aria-labelledby="compte" class="responsive-layout">
      <h2 id="compte" class="text-h2 pt-24 pb-12 uppercase text-brown-700">Gestion du compte</h2>
      <div class="flex flex-col sm:flex-row gap-6">
        <button class="btn btn-red w-fit" @click="handleDelete">Supprimer mon compte</button>
        <button class="btn w-fit" @click="logout">Déconnexion</button>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>