import {
    createDirectus,
    rest,
    registerUser,
    authentication,
    readMe,
    refresh,
    readItems,
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
    const url = config.public.directus.url;

    const directus = createDirectus(url)
        .with(authentication("cookie", {credentials: "include", autoRefresh: true, storage}))
        .with(rest({credentials: "include"}));

    const isAuthenticated = async () => {
        try {
            const me = await directus.request(readMe());
            return me;
        } catch (error) {
            console.error(error)
            return 'false';
        }
    };

    const refreshToken = async () => {
        return directus.request(
            refresh('cookie')
        );
    };

    const logout = async () => {
        await directus.logout()
        navigateTo('/')
    }

    return {
        provide: {directus, registerUser, isAuthenticated, refreshToken, logout, readItems},
    };
})