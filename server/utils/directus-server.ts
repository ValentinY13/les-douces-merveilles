import {
    createDirectus,
    rest,
    readUsers,
    registerUser,
    registerUserVerify,
    passwordRequest,
    passwordReset,
    authentication,
    readItems,
    createItem,
} from '@directus/sdk';

const directusUrl = useRuntimeConfig().public.directus.url;

const directusServer = createDirectus(directusUrl)
    .with(authentication('cookie', {autoRefresh: true}))
    .with(rest({credentials: "include"}));

export {
    directusServer,
    readUsers,
    registerUser,
    registerUserVerify,
    passwordRequest,
    passwordReset,
    readItems,
    createItem,
};
