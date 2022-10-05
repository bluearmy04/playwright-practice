import { Locator, Page ,expect} from "@playwright/test";

export class ConfirmationPage{
    page: Page
    txtThanks: Locator
    orderId: Locator

    constructor(page:Page)
    {
        this.page = page;
        this.txtThanks = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async returnOrderId()
    {
        await expect(this.txtThanks).toHaveText(' Thankyou for the order. ');
        let orderId; 
        orderId= await this.orderId.textContent();
        return orderId;
    }
}