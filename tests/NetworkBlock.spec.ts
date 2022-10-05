import { test, expect } from '@playwright/test';

test('Network call block', async({page})=>{
    
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const username = page.locator('input#username');
    const password = page.locator("[name='password']");
    const signinBtn = page.locator('input#signInBtn');
    const cardTitles = page.locator('div.card-body a')

    //block all kind of image request in network
    page.route('**/*.{jpg,jpeg,png}',route=> route.abort());
    await username.type('rahulshettyacademy')
    await password.type('learning')
    await signinBtn.click();
    
    //print all response & reuqest call in console
    page.on('request',request=>console.log(request.url()))
    page.on('response',reponse=>console.log(reponse.url()+" "+reponse.status()))
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