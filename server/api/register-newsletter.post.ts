import {directusServer, readUsers, updateUser} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const user = await directusServer.request(readUsers({
            fields: ['id', 'newsletter', 'status'],
            filter: {
                email: {
                    _eq: body.email
                }
            }
        }))

        if (user.length === 0) {
            return {status: 'error', errorMessage: 'Vous devez avoir un compte associé à cette adresse mail'}
        }

        if (user[0].status !== 'active') {
            return {status: 'error', errorMessage: 'Une erreur est survenue'}
        }

        if (user[0].newsletter) {
            return {status: 'error', errorMessage: 'Vous êtes déjà inscris à notre newsletter avec cette adresse'}
        }

        await directusServer.request(updateUser(user[0].id, {newsletter: true}))
    } catch (e) {
        return {status: 'error', errorMessage: 'Une erreur est survenue'}
    }
})