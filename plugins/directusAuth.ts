import {
    createDirectus,
    rest,
    registerUser,
    authentication,
    readMe,
    refresh,
    type AuthenticationStorage
} from "@directus/sdk";

export default defineNuxtPlugin(() => {

    class NuxtCookieStorage {
        cookie = useCookie("directus-data");

        get() {
            return this.cookie.value;
        }

        set(data: any) {
            this.cookie.value = data;
        }
    }

    const storage = new NuxtCookieStorage() as AuthenticationStorage;

    const config = useRuntimeConfig();
    const url = config.public.nuxtUrl;

    const directusAuth = createDirectus(`${url}/directus`)
        .with(authentication("cookie", {credentials: "include", autoRefresh: true, storage}))
        .with(rest({credentials: "include"}));

    const isAuthenticated = async () => {
        try {
            const me = await directusAuth.request(readMe());
            return me;
        } catch (error) {
            console.error(error)
            return 'false';
        }
    };

    const refreshToken = async () => {
        return directusAuth.request(
            refresh('cookie')
        );
    };

    const logout = async () => {
        await directusAuth.logout()
        navigateTo('/')
    }

    return {
        provide: {directusAuth, registerUser, isAuthenticated, refreshToken, logout},
    };
})