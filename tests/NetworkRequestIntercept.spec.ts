import { test, expect,request, APIResponse } from '@playwright/test';
import {APIUtils} from '../Utils/APIUtils'

const loginPayload = {userEmail: "riyad.rafat@cefalo.com", userPassword: "Fcxiphoid04"}
let apiutils: APIUtils;
let token;

test.beforeAll(async()=>{

    const APIContext = await request.newContext();
    apiutils = new APIUtils(APIContext,loginPayload);
    token = await apiutils.getToken();
})

test('Mock Request header of network call',async({page})=>{

    //login
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },token)
    await page.goto('https://rahulshettyacademy.com/client');

    //intercepting network call
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6339dc1bc4d0c51f4f33930c',
    async route=>
    {
        await route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=633af366c4d0c51f4f343f1e'})
    }
    )
    await page.locator("li [routerlink*='dashboard/myorders']").click();
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    await expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order');
})