import * as yup from 'yup'

const selectValues = [
    'Problème avec une commande',
    'Informations sur un produit',
    'Évènements et commandes spéciales',
    'Partenariats et professionnels',
    'Autre',
]

export default yup.object({
    lastname: yup.string().trim().required('Le champ nom est obligatoire').default('Doe'),
    firstname: yup.string().trim().required('Le champ prénom est obligatoire').default('John'),
    email: yup.string().trim().email('Le champ e-mail doit être une adresse mail valide').required('Le champ e-mail est obligatoire').default('test4@mail.com'),
    subject_select: yup.string().required('Le choix du sujet est obligatoire').oneOf(selectValues),
    message: yup.string().max(1500).required('Le champ message est obligatoire').default('Mon message'),
})