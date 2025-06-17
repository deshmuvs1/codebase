class APIUtils{




    constructor( APIcontext, loginpayload){

         this.APIcontext =  APIcontext;
        this.loginpayload = loginpayload;
}

async getToken(){

    
       const loginresponse = await this.APIcontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        
        
        data : this.loginpayload 
})


     const loginresponsejson = await  loginresponse.json();
    const token = loginresponsejson.token;
    console.log(token);
        return token;
}



async createOrder(orderpayload){


    let response ={};
    response.token = await this.getToken(); 
    const orderResponse  = await  this.APIcontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order"
        , {
        
            data : orderpayload ,
            headers: {
                'authorization': response.token ,
                'content-type' : "application/json"
            },  
        
          });
        

          const orderResponsejson = await orderResponse.json();   
          console.log(orderResponsejson);  
          const orderId =  orderResponsejson.orders[0];
          response.orderId=orderId
          return response;


}

}

module.exports ={APIUtils};