const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { createClient } = require("yappy-node-back-sdk");

let yappyClient = createClient(process.env.MERCHANT_ID, process.env.SECRET_KEY);
console.log("Client" + yappyClient)
const payment = {
  total: null,
  subtotal: null,
  shipping: 0.0,
  discount: 0.0,
  taxes: null,
  orderId: null,
  successUrl: "https://the-watcher-comic-backend.herokuapp.com/api/pagosbg/id/1234",
  failUrl: "https://yappy.peqa.dev",
  tel: process.env.TEL || "66666666",
  domain: process.env.DOMAIN || "https://yappy.peqa.dev/",
};

class YappyController {
    
    async generateUrlMethod(req, res) {
        const string =`https://the-watcher-comic-backend.herokuapp.com/api/pagosbg?${1234}`
        console.log("String " + string)
        const { name, price: subtotal } = req.body;
        const uuid = uuidv4();
        const taxes = Number((subtotal * 0.07).toFixed(2));
        const total = subtotal + taxes;
        const newPayment = {
            ...payment,
            subtotal: 0.01, // Para evitar tener que pagar durante la prueba
            taxes: 0.01, // Para evitar tener que pagar durante la prueba
            total: 0.02, // Para evitar tener que pagar durante la prueba
            orderId: uuid.split("-").join("").slice(0, 10),
        };
        const response = await yappyClient.getPaymentUrl(newPayment);
        res.json(response);
    }
    async confirmPayment(req, res) {
        console.log("Request "+ req.params);
        const data = req.params;
        console.log("Data" + JSON.stringify(data));
            return res.status(200).send( "Hi" );
    }
}
module.exports = YappyController;