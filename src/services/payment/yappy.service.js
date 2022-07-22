const { v4: uuidv4 } = require("uuid");
const { createClient } = require("yappy-node-back-sdk");

let yappyClient = createClient(process.env.MERCHANT_ID, process.env.SECRET_KEY);

class YappyService {
    
    async generateUrlService({ name, price: subtotal}) {
        const uuid = uuidv4();
        const taxes = Number((subtotal * 0.07).toFixed(2));
        const total = subtotal + taxes;
        const orderId = uuid.split("-").join("").slice(0, 10)
        const payment = {
            total: null,
            subtotal: null,
            shipping: 0.0,
            discount: 0.0,
            taxes: null,
            orderId: null,
            successUrl: `https://the-watcher-comic-backend.herokuapp.com/api/pagosbg/id/${orderId}/status/success`,
            failUrl: `https://the-watcher-comic-backend.herokuapp.com/api/pagosbg/id/${orderId}/status/error`,
            tel: process.env.TEL || "66666666",
            domain: process.env.DOMAIN || "https://yappy.peqa.dev/",
        };
        const newPayment = {
            ...payment,
            subtotal: 0.01,
            taxes: 0.01,
            total: 0.02,
            orderId: orderId,
        };
        return yappyClient.getPaymentUrl(newPayment);
    }
}
module.exports = YappyService;