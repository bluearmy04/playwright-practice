import { test, expect,request } from '@playwright/test';
import {APIUtils} from '../Utils/APIUtils'

const loginPayload = {userEmail: "riyad.rafat@cefalo.com", userPassword: "Fcxiphoid04"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]}
let apiutils: APIUtils;
let response;
let token;

test.beforeAll(async()=>{

    const APIContext = await request.newContext();
    apiutils = new APIUtils(APIContext,loginPayload);
    token = await apiutils.getToken();
})

test('API testing',async({page})=>{

    //login
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },token)
    await page.goto('https://rahulshettyacademy.com/client');
    //console.log(typeof(token));
  
    //place order
    response = await apiutils.createOrder(orderPayload);
    //console.log(response)

    //assertion
    await page.locator("li [routerlink*='dashboard/myorders']").click();
    const rowCount = page.locator('tbody tr');
    await rowCount.first().waitFor();
    // page.pause();
    for(let i=0;i < await rowCount.count();i++)
    {
        let rowOrderId;
        rowOrderId = await rowCount.nth(i).locator('th').textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rowCount.locator('button').first().click();
            break;
        }
    }   
})