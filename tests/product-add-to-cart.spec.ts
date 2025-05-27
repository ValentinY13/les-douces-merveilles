import {test, expect} from '@playwright/test';

test('Sélectionner un produit et l\'ajouter au panier', async ({page}) => {
    await page.goto('/nos-collections/truffes/truffe-miel-sesame', {timeout: 10000})

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('Console error:', msg.text());
        }
    });

    await page.getByRole('button', {name: 'Ajouter au panier'}).click();

    await page.goto('/panier', {timeout: 10000})

    await expect(page.getByText('Truffe Miel & Sésame')).toBeVisible({timeout: 10000});
})