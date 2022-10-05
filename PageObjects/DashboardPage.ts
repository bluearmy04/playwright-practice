import { Locator, Page } from "@playwright/test";

export class DashboardPage
{
    page: Page
    products: Locator
    btnCart: Locator

    constructor(page:Page)
    {
        this.page = page;
        this.products = page.locator('.card-body');
        this.btnCart = page.locator("[routerlink*='cart']");
    }

    async AddProducts(productName:string)
    {
        const count = await this.products.count();
        console.log(count);
        for(let i=0;i<count;i++)
        {
            if(await this.products.nth(i).locator('b').textContent() == productName)
            {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.btnCart.click();
    }
}