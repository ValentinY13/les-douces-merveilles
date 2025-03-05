import * as yup from 'yup'

export default yup.object({
    lastname: yup.string().required('Le champ nom est obligatoire').default('Doe'),
    firstname: yup.string().required('Le champ prénom est obligatoire').default('John'),
    email: yup.string()
        .required('Le champ e-mail est obligatoire')
        .email('Le champ e-mail doit être une adresse mail valide').default('test4@mail.com'),
    password: yup.string()
        .required('Le champ mot de passe est obligatoire')
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
            "Le mot de passe doit contenir au moins un symbole"
        )
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule").default('Pyrexv016^^'),
    confPassword: yup.string()
        .required('Le champ confirmation de mot de passe est obligatoire')
        .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas').default('Pyrexv016^^'),
    confidentiality: yup.boolean()
        .oneOf([true], '')
        .required('Le champ politique de confidentialité est obligatoire').default(true),
})