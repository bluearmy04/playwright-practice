import { Locator, Page } from "@playwright/test";

export class LoginPage{

    page: Page
    txtUsername: Locator
    txtPassword: Locator
    btnSignin: Locator

    constructor(page:Page)
    {
        this.page = page;
        this.txtUsername = page.locator('#userEmail');
        this.txtPassword = page.locator("#userPassword");
        this.btnSignin = page.locator('#login');
    }

    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/')
    }

    async validLogin(username:string,password:string)
    {
        await this.txtUsername.type(username)
        await this.txtPassword.type(password)
        await this.btnSignin.click();
        await this.page.waitForLoadState('networkidle')
    }
}
