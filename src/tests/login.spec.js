import {expect} from "@playwright/test";
import { test } from "../pages/base";
import { LoginPage } from "../pages/login.page";
import { invalidUser, lockedUser, validUser } from "../test-data/users";

test.describe('LoginPage Testing',()=>{
    test.beforeEach(async({loginPage})=>{
        await loginPage.goto();
    })
    test('TC01 Input fields should display as the data that was filled',async({loginPage})=>{
        await loginPage.fillUserPassword('standard_user','secret_sauce');
        expect(await loginPage.getUsername()).toBe('standard_user');
        expect(await loginPage.getPassword()).toBe('secret_sauce');
    });
    test('TC02 Should show an error message if log in without a username',async({loginPage})=>{
        await loginPage.fillUserPassword('','secret_sauce');
        await loginPage.clickLogin();
        expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username is required');
        expect(await loginPage.sameUrl()).toBe(true);
    })
    test('TC03 Should show an error message if log in without a password',async({loginPage})=>{
        await loginPage.fillUserPassword('standard_user','');
        await loginPage.clickLogin();
        expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Password is required');
        expect(await loginPage.sameUrl()).toBe(true);
    })
    test('TC04 Should show an error message if log in with both fields blank',async({loginPage})=>{
        await loginPage.fillUserPassword('standard_user','');
        await loginPage.clickLogin();
        expect(await loginPage.getErrorMessage()).toContain('is required');
        expect(await loginPage.sameUrl()).toBe(true);
    })
    validUser.forEach(({username,password})=>{
        test(`TC05 Should logged in successfully with valid credentials ${username}`,async({loginPage})=>{
            await loginPage.fillUserPassword(username,password);
            await loginPage.clickLogin();
            expect(await loginPage.getErrorMessage()).not.toContain('is required');
            expect(await loginPage.sameUrl()).toBe(false);
        })
    })
    invalidUser.forEach(({username,password})=>{
        test(`TC06 Should logged in fails with an error message when using invalid credentials ${username}`,async({loginPage})=>{
            await loginPage.fillUserPassword(username,password);
            await loginPage.clickLogin();
            expect(await loginPage.getErrorMessage()).toContain('do not match any');
            expect(await loginPage.sameUrl()).toBe(true);
        })
    })
    lockedUser.forEach(({username,password})=>{
        test(`TC07 Should logged in fails with an error message when using locked credentials ${username}`,async({loginPage})=>{
            await loginPage.fillUserPassword(username,password);
            await loginPage.clickLogin();
            expect(await loginPage.getErrorMessage()).toContain('locked out');
            expect(await loginPage.sameUrl()).toBe(true);
        })
    })
    
})
