import { Locator, Page, expect } from "@playwright/test";

export class OrderHistoryPage {
    page: Page
    btnMyOrders: Locator
    rowCount: Locator

    constructor(page: Page) {
        this.page = page;
        this.btnMyOrders = page.locator("li [routerlink*='dashboard/myorders']");
        this.rowCount = page.locator('tbody tr');
    }

    async verifyLastOrder(orderId) 
    {
        await this.btnMyOrders.click();
        await this.rowCount.first().waitFor();
        //console.log(await rowCount.count());
        for (let i = 0; i < await this.rowCount.count(); i++) 
        {
            let rowOrderId;
            rowOrderId = await this.rowCount.nth(i).locator('th').textContent();
            //console.log('rowOrderId:'+ rowOrderId.trim())
            //console.log('OrderId:'+ orderId.trim())
            if (orderId.includes(rowOrderId)) 
            {
                await this.rowCount.locator('button').first().click();
                //await page.pause();
                break;
            }

        }
    }
}