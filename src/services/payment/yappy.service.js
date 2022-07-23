const { v4: uuidv4 } = require("uuid");
const { createClient } = require("yappy-node-back-sdk");
const dbConnection = require('../../db/mysql.config')

let yappyClient = createClient(process.env.MERCHANT_ID, process.env.SECRET_KEY);

class YappyService {
    
    async generateUrlService({body, authId}) {
        const { price: subtotal, clientId, comicIds} = body
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
            failUrl: `https://the-watcher-comic-backend.herokuapp.com/api/pagosbg/id/${orderId}/status/cancelled`,
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
        const fruits = ["1", "2", "3", 4];
        console.log(fruits.includes(4));
        const [rowsUser, fieldsUser] = await dbConnection.queryDB('call dbsp_getStoreComicsByUserId(?)', true, [4])
        rowsUser.forEach(element => {
            console.log("Element: " + typeof(element.com_id))
            console.log("Fruits   : "+ fruits)
            console.log("Typeof: "+ typeof(fruits[0]))
            console.log("ComicsIds: "+ comicIds)
            console.log("Typeof: "+ typeof(comicIds[0]))
            if(!comicIds.includes(element.com_id.value)) {
                console.log("Entro al if")
                const [rows, fields] = dbConnection.queryDB('call dbsp_insertOrder(?, ?, ?, ?)', true, [orderId, 'generated', comicIds, 4]);
            }
            console.log("Entro 2")
        });
        
        console.log("Database Response: " + JSON.stringify(rows));
        return yappyClient.getPaymentUrl(newPayment);
    }
    async confirmPaymentService({ id, status }) {
        const [rows, fields] = await dbConnection.queryDB('call dbsp_updateOrderByOrderId(?, ?)', true, [id, status]);
        console.log("Database Response: " + JSON.stringify(rows));
    }
}
module.exports = YappyService;