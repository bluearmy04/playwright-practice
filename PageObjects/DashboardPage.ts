import { Locator, Page } from "@playwright/test";

export class DashboardPage
{
    page: Page
    productAddtoCartButton: (productName: string) => Locator
    btnCart: Locator

    constructor(page:Page)
    {
        this.page = page;
        this.productAddtoCartButton = (productName: string)=> page.locator('.card-body').filter({has: page.getByRole('heading', {name: productName})})
                                                                .getByRole('button',{name: ' Add To Cart'});
        this.btnCart = page.locator("[routerlink*='cart']");
    }

    async AddProducts(productName:string)
    {
        await this.productAddtoCartButton(productName).click()
    }

    async navigateToCart()
    {
        await this.btnCart.click();
    }
}