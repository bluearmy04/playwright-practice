//const {test} = require('@playwright/test')
import { test, expect } from '@playwright/test';

test('Test with Browser Context declaration', async({browser})=>{
    //if we provide nothing on the newcontext parameter then playwright will handle the below 2 lines itself
    //we need not provide it then. in that case we can use the way 'Page Playwright Test' test 
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://google.com')
    await expect(page).toHaveTitle('Google')
})

//if pass only then only that test will be running from the whole file
//test.only('Page Playwright Test', async({page})=>{
test('Page Playwright Test', async({page})=>{
    
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const username = page.locator('input#username');
    const password = page.locator("[name='password']");
    const signinBtn = page.locator('input#signInBtn');
    const cardTitles = page.locator('div.card-body a')

    await username.type('rahulshetty')
    await password.type('learning')
    await signinBtn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')

    await username.fill("")
    await username.fill("rahulshettyacademy");
    
    //race condition
    await Promise.all(
        [
            page.waitForNavigation(),
            signinBtn.click()
        ]
    );

    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());

    //to default wait for allTextContents method
    console.log(await cardTitles.allTextContents())
})

test('UI Elements Check', async({page})=>{
    
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const username = page.locator('input#username');
    const password = page.locator("[name='password']");
    const signinBtn = page.locator('input#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");
    
    await username.fill("rahulshettyacademy");
    await password.type('learning')
    const dropdownStatic = await page.locator('select.form-control');
    dropdownStatic.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    
    //assertions
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    //if action is performed inside expect() then await should also be in inside
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');
    
    //await page.pause();

})

test('Child Window',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    //race condition video 19
    const [newPage] = await Promise.all([
        
        context.waitForEvent('page'),
        documentLink.click()
    ])
    
    let text;
    text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]

    await page.locator('input#username').type(domain);
    //await page.pause();
    //console.log(domain);

})
