import {expect} from "@playwright/test";
import { test } from "../pages/base";
import { LoginPage } from "../pages/login.page";

test.describe('CartPage Testing', () => {
    test.beforeEach(async({loginPage})=>{
        await loginPage.goto();
        await loginPage.fillUserPassword('standard_user','secret_sauce');
        await loginPage.clickLogin();
    })
    test('TC14 The cart badge should displays the correct number of items currently in the cart',async({cartPage})=>{
        await cartPage.goto();
        expect(await cartPage.getCartSize()).toBe(cartPage.getCartIconSize());
    })
    
})