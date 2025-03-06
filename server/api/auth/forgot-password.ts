import {directusServer, passwordRequest} from '~/server/utils/directus-server'
import ForgotPassword from "~/utils/forgot-password.schema";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log('BODY', body);

        const validatedData = await ForgotPassword.validate(body.email);

        const resetUrl = useRuntimeConfig().public.resetUrl;

        const isEmailExist = await directusServer.request(
            readUsers({
                filter: {
                    email: {
                        _eq: validatedData.email,
                    },
                },
                fields: ['email', 'status'],
            })
        );

        if (isEmailExist.length > 0 && isEmailExist[0].status !== 'active') {
            return {
                status: 'error',
                errorMessage: 'Adresse mail non associée à un compte actif, veuillez contacter le service client si vous souhaitez le réactiver'
            }
        } else if (isEmailExist.length === 0) {
            return {
                status: 'error',
                errorMessage: 'Aucun compte associé à cette adresse mail'
            }
        }

        await directusServer.request(passwordRequest(validatedData.email, resetUrl));
    } catch (e: any) {
        console.log(e);

        if (e instanceof yup.ValidationError) {
            sendError(event, createError({
                statusMessage: 'Une erreur est survenue, informations incorrect',
                statusCode: 400
            }), false)
        }

        sendError(event, createError({statusMessage: 'Une erreur est survenue', statusCode: 500}))
    }
})