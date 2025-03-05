import {
    createDirectus,
    rest,
    readUsers,
    registerUser,
    registerUserVerify,
    authentication,
} from '@directus/sdk';

const directusUrl = useRuntimeConfig().public.directus.url;

const directusServer = createDirectus(directusUrl)
    .with(authentication('cookie', {autoRefresh: true}))
    .with(rest());

export {
    directusServer,
    readUsers,
    registerUser,
    registerUserVerify,
};
