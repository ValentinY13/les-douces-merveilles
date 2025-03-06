import * as yup from 'yup'

export default yup.object({
    email: yup.string().trim()
        .required('Le champ e-mail est obligatoire')
        .email('Le champ e-mail doit être une adresse mail valide').default('test4@mail.com'),
})