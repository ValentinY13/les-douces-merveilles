export default defineNuxtRouteMiddleware(async (to, from) => {
    const {$isAuthenticated, $directus} = useNuxtApp();
    let user = await $isAuthenticated()

    if (!user && import.meta.client) {
        try {
            await $directus.refresh()
        } catch (e) {
            return navigateTo('/')
        }
    }
})