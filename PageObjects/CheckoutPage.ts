import { Locator, Page ,expect} from "@playwright/test";

export class CheckoutPage
{
    page: Page
    inputCountry: Locator
    ddCountry: Locator
    ddOptions: Locator
    fieldEmail: Locator
    btnPlaceOrder: Locator

    constructor(page:Page)
    {
        this.page = page;
        this.inputCountry = page.locator("input[placeholder*='Country']");
        this.ddCountry = page.locator('.ta-results');
        this.ddOptions = this.ddCountry.locator('button');
        this.fieldEmail = page.locator(".user__name label[type='text']");
        this.btnPlaceOrder = page.locator('.action__submit');
    }

    async fillInformation(email: string)
    {
        await this.inputCountry.type('ban',{delay:100});
        //const dropdown = page.locator('.ta-results');
        await this.ddCountry.waitFor();
        const options = await this.ddOptions.count();
        for(let i=0;i<options;i++)
        {
        const text = await this.ddOptions.nth(i).textContent();
        if(text?.trim() === "Bangladesh")
        {
            this.ddOptions.nth(i).click();
            break;
        }
        }
    
        await expect(this.fieldEmail).toHaveText(email);
        
    }

    async confirmOrder()
    {
        await this.btnPlaceOrder.click();
    }
}