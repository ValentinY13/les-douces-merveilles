export default defineNuxtRouteMiddleware(async (to, from) => {
    const {$isAuthenticated} = useNuxtApp();
    const user = await $isAuthenticated()

    if (to.query.auth === 'google') return

    if (!user) {
        return navigateTo('/')
    }

})
