import { convertStringToNumber, removeDollarsSign } from "../utils";

export class ProductPage {
    baseUrl = 'https://www.saucedemo.com/inventory.html'
    // Product-ADD_REMOVE Attribute
    locatorProduct = '.inventory_item' 
    locatorProductName = '.inventory_item_name'
    locatorShoppingCart = '.shopping_cart_link'
    locatorProductPrice = '.inventory_item_price'
    locatorShoppingCart = '.shopping_cart_link'

    // Product-SORT Attribute
    locatorProductSort = 'select'
    sortByAtoZ = 'az'
    sortByZtoA = 'za'
    sortByLowtoHigh = 'lohi'
    sortByHightoLow = 'hilo'

    /**
     * 
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page; 
        this.productList = this.page.locator(this.locatorProduct);
    }

    async goto(){
        await this.page.goto(this.baseUrl);
    }

    // Product-ADD_REMOVE
    async ClickAllProduct(){
        for (let i = 0; i < await this.productList.count(); i++) {
            // await this.page.locator(this.locatorProduct).nth(i).getByRole('button', { name: 'Add to cart'}).click();
            await this.productList.nth(i).getByRole('button', { name: 'Add to cart'}).click();
        }
    }
    async RemoveAllProduct(){
        for (let i = 0; i < await this.productList.count(); i++) {
            await this.productList.nth(i).getByRole('button', { name: 'Remove'}).click();
        }
    }
    async getCartSize(){
        const shopping_cart_Label = await this.page.locator(this.locatorShoppingCart).textContent();
        return shopping_cart_Label ==='' ? 0 : convertStringToNumber(await this.page.locator(this.locatorShoppingCart).textContent());
    }

    // Product-Sort
    async selectProductSortAtoZ(){
        await this.page.locator(this.locatorProductSort).selectOption(this.sortByAtoZ);
    }
    async selectProductSortZtoA(){
        await this.page.locator(this.locatorProductSort).selectOption(this.sortByZtoA);
    }
    async selectProductSortLowtoHigh(){
        await this.page.locator(this.locatorProductSort).selectOption(this.sortByLowtoHigh);
    }
    async selectProductSortHightoLow(){
        await this.page.locator(this.locatorProductSort).selectOption(this.sortByHightoLow);
    }
    
    // Product-Sort_Check 
    async isSortedByAtoZ(){
        let previousName ;
        let isSorted = true ;
        for (let i = 0; i < await this.productList.count(); i++) {
            if(i==0){
                previousName = await this.productList.nth(i).locator(this.locatorProductName).textContent();
                continue;
            }
            let currentName = await this.productList.nth(i).locator(this.locatorProductName).textContent();
            console.log("this is previous name :"+previousName);
            console.log("this is current name :"+currentName);
            if(currentName<previousName){
                return false ;
            }
            previousName = currentName;
        }
        return isSorted;
    }
    async isSortedByZtoA(){
        let previousName ;
        let isSorted = true ;
        for (let i = 0; i < await this.productList.count(); i++) {
            if(i==0){
                previousName = await this.productList.nth(i).locator(this.locatorProductName).textContent();
                continue;
            }
            let currentName = await this.productList.nth(i).locator(this.locatorProductName).textContent();
            console.log("this is previous name :"+previousName);
            console.log("this is current name :"+currentName);
            if(currentName>previousName){
                return false ;
            }
            previousName = currentName;
        }
        return isSorted;
    }

    async isSortedByLowtoHigh(){
        let previousPrice ;
        let isSorted = true ;
        for (let i = 0; i < await this.productList.count(); i++) {
            if(i==0){
                previousPrice = removeDollarsSign(await this.productList.nth(i).locator(this.locatorProductPrice).textContent());
                continue;
            }
            let currentPrice = removeDollarsSign(await this.productList.nth(i).locator(this.locatorProductPrice).textContent());
            
            console.log("this is previous price :"+previousPrice);
            console.log("this is current price :"+currentPrice);
            if(currentPrice<previousPrice){// ถ้าข้างหน้ามากกว่าข้างหลัง
                return false ;
            }
            previousPrice = currentPrice;
        }
        return isSorted;
    }
    
    async isSortedByHightoLow(){
        let previousPrice ;
        let isSorted = true;
        for (let i = 0; i < await this.productList.count(); i++) {
            if(i==0){
                previousPrice = removeDollarsSign(await this.productList.nth(i).locator(this.locatorProductPrice).textContent());
                continue;
            }
            let currentPrice = removeDollarsSign(await this.productList.nth(i).locator(this.locatorProductPrice).textContent());
            if(currentPrice>previousPrice){// ถ้าข้างหลังมากกว่าข้างหน้า
                return false ;
            }
            console.log("this is previous price :"+previousPrice);
            console.log("this is current price :"+currentPrice);
            previousPrice = currentPrice;
        }
        return isSorted;
    }

    //
    getPageUrl(){
        console.log(this.page.url());
        return this.page.url();
    }
    async clickProductCart(){

        
        await this.page.locator(this.locatorShoppingCart).click();   
    }
}
