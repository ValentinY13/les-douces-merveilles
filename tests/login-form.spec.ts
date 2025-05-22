import {test, expect} from '@playwright/test';

const url = 'http://localhost:3000'

test('Connexion refusée si compte lié à Google', async ({page}) => {
    await page.route('**/users/*', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([{provider: 'google'}])
        })
    })

    await page.goto(`${url}/se-connecter`)

    await page.waitForSelector('button[type="submit"]', {state: 'visible'});

    await page.waitForSelector('form');

    await page.fill('input[name="email"]', 'test@gmail.com')
    await page.fill('input[name="password"]', 'testgmail')

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('http://localhost:3000/se-connecter')
})

test('Connexion réussie', async ({page}) => {
    await page.goto(`${url}/se-connecter`);

    await page.fill('input[name="email"]', 'test4@mail.com');
    await page.fill('input[name="password"]', 'Pyrexv016^^');

    await page.click('button[type="submit"]');

    await page.waitForURL('**/mon-compte');

    await expect(page.getByRole('heading', {name: 'Information du compte'})).toBeVisible()
    await expect(page.getByText('Vous êtes connecté')).toBeVisible()
})

test('Erreur identifiants invalides', async ({page}) => {
    await page.route('**/login/login', async route => {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({
                errors: [
                    {
                        code: 'INVALID_CREDENTIALS',
                        message: 'Invalid credentials',
                    }
                ]
            })
        })
    })

    await page.goto(`${url}/se-connecter`)

    await page.waitForSelector('button[type="submit"]', {state: 'visible'});
    await page.waitForSelector('form');

    await page.fill('input[name="email"]', 'fake@user.com');
    await page.fill('input[name="password"]', 'wrong-password');

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:3000/se-connecter')
})