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
    successUrl: "https://the-watcher-comic-backend.herokuapp.com",
    failUrl: "https://the-watcher-comic-backend.herokuapp.com",
    tel: process.env.TEL || "60231169",
    domain: process.env.DOMAIN || "https://the-watcher-comic-backend.herokuapp.com",
};

class YappyController {
    async generateUrlMethod(req, res) {
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
        const success = yappyClient.validateHash(req.query);
        if (success) {
            return res.status(200).send( "Hi" );
        }
    }
}
module.exports = YappyController;