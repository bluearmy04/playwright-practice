import { Page} from "@playwright/test";
import {LoginPage} from './LoginPage'
import {DashboardPage} from '../PageObjects/DashboardPage'
import {CartPage} from '../PageObjects/CartPage'
import {CheckoutPage} from '../PageObjects/CheckoutPage'
import {ConfirmationPage} from '../PageObjects/ConfirmationPage'
import {OrderHistoryPage} from '../PageObjects/OrderHistoryPage'

export class POManager
{
    page: Page
    loginpage: LoginPage
    dashboardpage: DashboardPage
    cartpage: CartPage
    checkoutpage: CheckoutPage
    confirmationpage: ConfirmationPage
    orderhistorypage: OrderHistoryPage

    constructor(page:Page)
    {
        this.page = page
        this.loginpage = new LoginPage(this.page)
        this.dashboardpage = new DashboardPage(page)
        this.cartpage = new CartPage(page)
        this.checkoutpage = new CheckoutPage(page)
        this.confirmationpage = new ConfirmationPage(page)
        this.orderhistorypage = new OrderHistoryPage(page)
    }

    getLoginPage()
    {
        return this.loginpage;
    }

    getdashboardpage()
    {
        return this.dashboardpage;
    }

    getcartpage()
    {
        return this.cartpage;
    }

    getcheckoutpage()
    {
        return this.checkoutpage;
    }

    getconfirmationpage()
    {
        return this.confirmationpage;
    }

    getorderhistorypage()
    {
        return this.orderhistorypage;
    }
}