import RegisterSchema from "~/utils/register.schema";
import * as yup from "yup";
import {
    directusServer,
    registerUser,
    readUsers,
    updateUser
} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    try {
        const verifyUrl = useRuntimeConfig().public.verifyEmailUrl;
        const body = await readBody(event);

        const validatedData = await RegisterSchema.validate(body);

        const options = {
            first_name: validatedData.firstname,
            last_name: validatedData.lastname,
            verification_url: verifyUrl,
        }

        const isEmailAlreadyExist = await directusServer.request(
            readUsers({
                filter: {
                    email: {
                        _eq: body.email
                    },
                },
                fields: ['email']
            })
        )

        if (isEmailAlreadyExist.length > 0) {
            return {status: 'error', errorMessage: 'Adresse mail déjà associée à un compte'}
        }

        await directusServer.request(registerUser(validatedData.email, validatedData.password, options))

        if (validatedData.newsletter) {
            const newUser = await directusServer.request(readUsers({
                fields: ['id'],
                filter: {
                    email: {
                        _eq: validatedData.email
                    }
                }
            }))

            await directusServer.request(updateUser(newUser[0].id, {newsletter: true}))
        }

    } catch (e) {
        if (e instanceof yup.ValidationError) {
            return {status: 'error', errorMessage: 'Validation des données échouées'}
        }
        sendError(event, createError({statusMessage: 'Une erreur est survenue', statusCode: 500}))
    }
})
