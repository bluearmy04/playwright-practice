import { test, expect,request, APIResponse } from '@playwright/test';
import {APIUtils} from '../Utils/APIUtils'

const loginPayload = {userEmail: "riyad.rafat@cefalo.com", userPassword: "Fcxiphoid04"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]}
let apiutils: APIUtils;
let token;
const fakeResponse = {data:[],message:"No Orders"}

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

    //intercepting network call
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62b877dce26b7e1a10eee059",
    async route =>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakeResponse);
        route.fulfill(
            {
                response,
                body
            }
        )
    } 
    )
    await page.pause();
    await page.locator("li [routerlink*='dashboard/myorders']").click();
    const noRowMessage = page.locator('.mt-4');
    const text = await noRowMessage.textContent();
    console.log('asf '+text);
    const bool = text?.includes(' You have No Orders to show at this time.');
    expect(bool).toBeTruthy();
    
})