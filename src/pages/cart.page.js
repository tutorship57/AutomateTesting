export class CartPage {

    baseUrl = 'https://www.saucedemo.com/cart.html'
    locatorCartItemList = '.cart_item'
    locatorCartBadge = '.shopping_cart_badge'

    constructor(page) {
        this.page = page;
        this.cartList = this.page.locator(this.locatorCartItemList);
    }

    async goto(){
        await this.page.goto(this.baseUrl);
    }

    async getCartSize(){
        return await this.cartList.count();
    }
    async getCartIconSize(){
        return await this.page.locator(this.locatorCartBadge).textContent();
    }
    
}