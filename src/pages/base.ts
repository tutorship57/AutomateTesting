import {test as base } from "@playwright/test"
import { LoginPage } from "./login.page"
import { ProductPage } from "./product.page"
import { CartPage } from "./cart.page"

type baseFixtures = { 
    loginPage : LoginPage
    productPage : ProductPage
    cartPage : CartPage
}

export const test = base.extend<baseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
    ,productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    }
    ,cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
})