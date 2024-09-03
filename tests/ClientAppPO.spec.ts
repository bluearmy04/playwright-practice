import { test } from '@playwright/test';
import {POManager} from '../PageObjects/POManager'
import { userData } from '../Utils/ClientAppPO';
const dataset = JSON.parse(JSON.stringify(userData))

for(const data of dataset)
{
    
    test(`Page Playwright Test ${data.productName}`, async({page})=>{
        
        const pomanager = new POManager(page);

        //login
        const loginpage = pomanager.getLoginPage();
        await loginpage.goTo();
        await loginpage.validLogin(data.email,data.password);

        //dashboard page
        const dashboardpage = pomanager.getdashboardpage();
        await dashboardpage.AddProducts(data.productName); 
        await dashboardpage.navigateToCart();

        //cart Page
        const cartpage = pomanager.getcartpage();
        await cartpage.gotoCheckout(data.productName);

        //checkout page
        const checkoutpage = pomanager.getcheckoutpage();
        await checkoutpage.fillInformation(data.email);
        await checkoutpage.confirmOrder();

        //Thank You Page
        const confirmationpage = pomanager.getconfirmationpage();
        const orderId = await confirmationpage.returnOrderId();

        //orderhistory page
        const orderhistorypage = pomanager.getorderhistorypage();
        await orderhistorypage.verifyLastOrder(orderId);
    })

}

