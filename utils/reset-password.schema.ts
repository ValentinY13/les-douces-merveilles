import * as yup from 'yup'

export default yup.object({
    password: yup.string().trim()
        .required('Le champ mot de passe est obligatoire')
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
            "Le mot de passe doit contenir au moins un symbole"
        )
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule").default('Pyrexv016^^'),
    confPassword: yup.string().trim()
        .required('Le champ confirmation de mot de passe est obligatoire')
        .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas').default('Pyrexv016^^'),
})