import {
    createDirectus,
    rest,
    readItems,
} from "@directus/sdk";

export default defineNuxtPlugin(() => {

    const config = useRuntimeConfig();
    const url = config.public.directus.url;

    const directus = createDirectus(url).with(rest());

    return {
        provide: {directus, readItems},
    };
})