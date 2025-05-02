export default defineNuxtRouteMiddleware(async (to, from) => {
    const {$isAuthenticated} = useNuxtApp();
    const user = await $isAuthenticated()

    if (!user) {
        return navigateTo('/')
    }

})
