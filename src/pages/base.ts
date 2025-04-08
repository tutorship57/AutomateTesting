import {test as base } from "@playwright/test"
import { LoginPage } from "./login.page"
import { ProductPage } from "./product.page"

type baseFixtures = { 
    loginPage : LoginPage
    productPage : ProductPage
}

export const test = base.extend<baseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
    ,productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    }
})