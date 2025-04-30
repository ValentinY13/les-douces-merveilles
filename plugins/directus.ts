import {
    authentication,
    type AuthenticationStorage,
    createDirectus,
    readItems,
    readMe,
    readUsers,
    refresh,
    registerUser,
    rest,
    triggerFlow,
    updateUser,
    createItem
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
            return await directus.request(readMe());
        } catch (error) {
            return false;
        }
    };

    const refreshToken = async () => {
        return directus.request(
            refresh('cookie')
        );
    };

    const logout = async () => {
        await directus.logout()
    }

    return {
        provide: {
            directus,
            registerUser,
            isAuthenticated,
            refreshToken,
            logout,
            readItems,
            readUsers,
            triggerFlow,
            storage,
            updateUser,
            createItem
        },
    };
})