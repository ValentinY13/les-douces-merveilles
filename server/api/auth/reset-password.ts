import {directusServer, passwordReset} from '~/server/utils/directus-server';
import ResetPassword from "~/utils/reset-password.schema";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        const token = body.token

        if (!token) {
            return {status: 'error', errorMessage: 'Aucun token, veuillez réessayer'}
        }

        const validatedData = await ResetPassword.validate(body.values)

        await directusServer.request(passwordReset(token, validatedData.password))

    } catch (e) {
        if (e instanceof yup.ValidationError) {
            return {status: 'error', errorMessage: 'Validation des données échouées'}
        }
        sendError(event, createError({statusMessage: 'Une erreur est survenue', statusCode: 500}))
    }
});
