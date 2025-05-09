import ContactSchema from "~/server/utils/contact.schema"

import * as yup from "yup";
import {
    directusServer, triggerFlow
} from '~/server/utils/directus-server'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        const validateData = await ContactSchema.validate(body);

        const FLOW_ID = useRuntimeConfig().contact_mail_id

        await directusServer.request(triggerFlow('POST', FLOW_ID, body));
    } catch (e) {
        if (e instanceof yup.ValidationError) {
            return {
                status: 'error',
                errorMessage: 'Validation des données échouées'
            }
        }

        return {
            status: 'error',
            errorMessage: 'Une erreur est survenue',
        }
    }
})