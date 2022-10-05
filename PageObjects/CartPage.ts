import { Locator, Page ,expect} from "@playwright/test";

export class CartPage{
    page: Page
    anyelement: Locator
    productTitle: Locator
    btnCheckout: Locator

    constructor(page:Page)
    {
        this.page = page;
        this.anyelement = page.locator('div li').first()
        //this.productTitle = page.locator("h3:has-text('adidas original')")
        this.btnCheckout = page.locator('text=Checkout')
    }

    async gotoCheckout(productName:string)
    {
        await this.anyelement.waitFor();
        //isvisble method does not auto await so we had to write the above line
        const productTitlevalue = "h3:has-text('"+productName+"'"+")"
        const bool = await this.page.locator(productTitlevalue).isVisible()
        expect(bool).toBeTruthy();
        await this.btnCheckout.click();
    }
}