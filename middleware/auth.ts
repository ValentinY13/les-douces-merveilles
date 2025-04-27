export default defineNuxtRouteMiddleware(async (to, from) => {
    const {$isAuthenticated} = useNuxtApp();
    let user = await $isAuthenticated()

    if (!user) {
        return navigateTo('/')
    }
})
