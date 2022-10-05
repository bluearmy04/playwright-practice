//const {test} = require('@playwright/test')
import { test, expect } from '@playwright/test';


test('Page Playwright Test', async({page})=>{
    
    
    await page.goto('https://rahulshettyacademy.com/client/')
    const email = 'riyad.rafat@cefalo.com';
    const username = page.locator('#userEmail');
    const password = page.locator("#userPassword");
    const loginBtn = page.locator('#login');
    const products = page.locator('.card-body');
    const productName = 'adidas original';
    const cardTitles = page.locator('div.card-body b')

    await username.type(email)
    await password.type('Fcxiphoid04')
    await loginBtn.click();

    await page.waitForLoadState('networkidle')
    //console.log(await cardTitles.allTextContents())

    const count = await products.count();

    for(let i=0;i<count;i++)
    {
        if(await products.nth(i).locator('b').textContent() == productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click()
    await page.locator('div li').first().waitFor();
    //isvisble method does not auto await so we had to write the above line
    const bool = await page.locator("h3:has-text('adidas original')").isVisible()
    await expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();

    //checkout page information
    //dynamic dropdown
    await page.locator("input[placeholder*='Country']").type('ban',{delay:100});
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const options = await dropdown.locator('button').count();
    for(let i=0;i<options;i++)
    {
        const text = await dropdown.locator('button').nth(i).textContent();
        if(text?.trim() === "Bangladesh")
        {
            dropdown.locator('button').nth(i).click();
            break;
        }
    }
    
    await expect(page.locator(".user__name label[type='text']")).toHaveText(email);
    await page.locator('.action__submit').click();

    //confirmation page
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    let orderId; 
    orderId= await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    //order history page
    await page.locator("li [routerlink*='dashboard/myorders']").click();
    const rowCount = page.locator('tbody tr');
    await rowCount.first().waitFor();
    //console.log(await rowCount.count());
    for(let i=0;i < await rowCount.count();i++)
    {
        let rowOrderId;
        rowOrderId = await rowCount.nth(i).locator('th').textContent();
        //console.log('rowOrderId:'+ rowOrderId.trim())
        //console.log('OrderId:'+ orderId.trim())
        if(orderId.includes(rowOrderId))
        {
            await rowCount.locator('button').first().click();
            //await page.pause();
            break;
        }
        
    }
})