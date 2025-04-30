import * as yup from 'yup'

export default yup.object({
    lastname: yup.string().trim().required('Le champ nom est obligatoire').default('Doe'),
    firstname: yup.string().trim().required('Le champ prénom est obligatoire').default('John'),
    email: yup.string().trim()
        .required('Le champ e-mail est obligatoire')
        .email('Le champ e-mail doit être une adresse mail valide').default('test4@mail.com'),
    newsletter: yup.boolean()
        .oneOf([true, false], 'ddd').default(false),
})