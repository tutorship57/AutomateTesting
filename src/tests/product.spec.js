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
        await productPage.page.waitForTimeout(3000);
        await productPage.RemoveAllProduct();
        await productPage.page.waitForTimeout(2000);
    })
    test('TC09 Product should correctly sorts items from A to Z',async({productPage})=>{
        await productPage.selectProductSortAtoZ();
        expect(await productPage.isSortedByAtoZ()).toBe(true);
    })
    test('TC10 Product should correctly sorts items from Z to A',async({productPage})=>{
        await productPage.selectProductSortZtoA();
        expect(await productPage.isSortedByZtoA()).toBe(true);
    })
    test('TC11 Product should correctly sorts items from price low to high',async({productPage})=>{
        await productPage.selectProductSortLowtoHigh();
        expect(await productPage.isSortedByLowtoHigh()).toBe(true);
    })
    test('TC12 Product should correctly sorts items from price high to low',async({productPage})=>{
        await productPage.selectProductSortHightoLow();
        expect(await productPage.isSortedByHightoLow()).toBe(true);
    })
    test.only('TC13 Product should correctly sorts items from price high to low',async({productPage})=>{
        await productPage.clickProductCart();
        expect(productPage.getPageUrl()).toBe('https://www.saucedemo.com/cart.html');
    })


})