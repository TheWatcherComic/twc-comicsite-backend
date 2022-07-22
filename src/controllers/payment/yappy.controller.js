const service = require('../../services/payment/yappy.service');
const serviceInstance = new service();

class YappyController {

    async generateUrlMethod(req, res) {
        try {
            const response = await serviceInstance.generateUrlService(req.body);
            return res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async confirmPayment(req, res) {
        try {
            await serviceInstance.confirmPaymentService(req.params);
            return res.status(301).redirect("https://twc-comicsite-frontend.vercel.app");
        } catch (err) {
            res.status(500).redirect("https://twc-comicsite-frontend.vercel.app");
        }
    }
}
module.exports = YappyController;