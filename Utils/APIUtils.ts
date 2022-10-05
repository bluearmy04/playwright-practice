export class APIUtils
{
    APIContext;
    loginPayload;

    constructor(APIContext,loginPayload){
        this.APIContext = APIContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const loginResponse = await this.APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: this.loginPayload
        }
        )
        const loginReponseJson = await loginResponse.json()
        let token = loginReponseJson.token; 
        return token;
    }

    async createOrder(orderPayload)
    {
        let response = {token:String,orderId:String};
        response.token = await this.getToken();
        const orderResponse = await this.APIContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'authorization': response.token,
                'Content-Type': 'application/json'
            }
        }
        )
        const orderResponseJson = await orderResponse.json();
        response.orderId = orderResponseJson.orders[0];
        return response;

    }
}
