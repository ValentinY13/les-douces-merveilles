import * as yup from 'yup'

export default yup.object({
    lastname: yup.string().trim().required('Le champ nom est obligatoire'),
    firstname: yup.string().trim().required('Le champ prénom est obligatoire'),
    email: yup.string().trim()
        .required('Le champ e-mail est obligatoire')
        .email('Le champ e-mail doit être une adresse mail valide'),
    newsletter: yup.boolean()
        .oneOf([true, false], 'ddd'),
})