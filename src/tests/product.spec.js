import { test } from "../pages/base";
import {expect} from "@playwright/test";
import { ProductPage } from "../pages/product.page";
import { LoginPage } from "../pages/login.page";
test.describe('productPage Testing', () => {
    test.beforeEach(async({loginPage})=>{
        await loginPage.goto();
        await loginPage.fillUserPassword('standard_user','secret_sauce');
        await loginPage.clickLogin();
    })
    test('TC08 Should show all products',async({productPage})=>{
        await productPage.ClickAllProduct();
        expect(await productPage.getCartSize()).toBe(6);
        await productPage.RemoveAllProduct();
        expect(await productPage.getCartSize()).toBe(0);
    })
    test('TC10 Product should correctly sorts items from price low to high',async({productPage})=>{
        await productPage.selectProductSortLowtoHigh();
        expect(await productPage.isSortedByLowtoHigh()).toBe(true);
    })
    test('TC11 Product should correctly sorts items from price low to high',async({productPage})=>{
        await productPage.selectProductSortHightoLow();
        expect(await productPage.isSortedByHightoLow()).toBe(true);
    })


})