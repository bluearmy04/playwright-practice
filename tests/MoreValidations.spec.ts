import { test, expect } from '@playwright/test';


test('UI elements test', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    //hover & dialog
    page.on('dialog', dialoge => dialoge.accept());
    //page.on('dialog', dialoge => dialoge.dismiss());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    await page.pause();

    //iframe
    const frmaesPage = page.frameLocator('#courses-iframe');
    await frmaesPage.locator("li a[href*='access']:visible").click();
})


test('Visual Testing Screenshot capture', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'PartialSS.png'})
    await page.locator('#hide-textbox').click();
    await page.screenshot({path:'FullPageSS.png'})

})



test.skip('Visual Testing match UI with SS', async({page})=>{

    await page.goto('https://bongobd.com/')
    await page.waitForLoadState('networkidle')
    expect(await page.screenshot()).toMatchSnapshot('bongoLanding.png');
})