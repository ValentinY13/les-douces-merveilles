import {defineStore, acceptHMRUpdate} from 'pinia';
import type {DirectusUsers} from "~/types";

export const useUserStore = defineStore('user', () => {
    const user = ref<DirectusUsers | null>(null)
    const {$isAuthenticated, $logout, $directus} = useNuxtApp()

    const loggedIn = computed(() => !!user.value)

    async function initSession() {
        try {
            await $directus.refresh()
            await fetchUser()
        } catch (e) {
            user.value = user.value
        }
    }

    function setUser(data: DirectusUsers | null) {
        user.value = data;
    }

    async function fetchUser() {
        const result = await $isAuthenticated()
        //@ts-ignore
        user.value = result || null;

        return user.value
    }

    async function logout() {
        await $logout()
        user.value = null
    }

    return {
        user,
        loggedIn,
        initSession,
        setUser,
        fetchUser,
        logout,
    }
})