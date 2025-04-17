import { removeSlashUrl } from "../utils"

export class LoginPage {

    baseUrl = 'https://www.saucedemo.com'
    locatorUsername = '#user-name'
    locatorPassword = '#password'
    locatorErrorMessage = '[data-test ="error"]'
    /**
     * 
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page; 
    }

    async goto(){
        await this.page.goto(this.baseUrl);
    }

    async fillUserPassword(username,password){
        await this.page.locator(this.locatorUsername).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);
    }

    async clickLogin(){
        await this.page.locator('#login-button').click();
    }
    async getUsername(){
       return await this.page.locator(this.locatorUsername).inputValue();
    }
    async getPassword(){
       return await this.page.locator(this.locatorPassword).inputValue();
    }
    async getErrorMessage(){
        
        try {
            return await this.page.locator(this.locatorErrorMessage).textContent({timeout:1000}) || '';
        } catch (error) {
        }
        return '';
    }
    async sameUrl(){
        console.log(removeSlashUrl(this.page.url()));
        return removeSlashUrl(this.page.url()) === this.baseUrl;
    }
}