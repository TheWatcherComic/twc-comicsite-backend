const { Router } = require('express');
const { YAPPY_ENDPOINT } = require('../../utils/endpoints')
const controller = require('../../controllers/payment/yappy.controller');
const controllerInstance = new controller();
const router = Router()
.post(YAPPY_ENDPOINT + "/url", controllerInstance.generateUrlMethod)
.get(YAPPY_ENDPOINT + "/id/:id" , controllerInstance.confirmPayment);

module.exports = router;