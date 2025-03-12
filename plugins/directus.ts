import {
    createDirectus,
    rest,
    readItems,
    createItem
} from "@directus/sdk";

export default defineNuxtPlugin(() => {

    const config = useRuntimeConfig();
    const url = config.public.directus.url;

    const directus = createDirectus(url).with(rest());

    return {
        provide: {directus, readItems, createItem},
    };
})