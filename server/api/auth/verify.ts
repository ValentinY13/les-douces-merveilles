import {
    directusServer,
    registerUserVerify,
} from '~/server/utils/directus-server';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const token = query.token as string;

    if (!token) {
        sendError(event, createError({statusMessage: 'Token manquant', statusCode: 400}))
    }

    try {
        await directusServer.request(registerUserVerify(token));
    } catch (e) {
        sendError(event, createError({statusMessage: 'Token invalide', statusCode: 400}))
    }
})