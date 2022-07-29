const { Router } = require('express');
const { YAPPY_ENDPOINT } = require('../../utils/endpoints')
const checkIfAuthenticated = require('../../middlewares/authentication.middleware');
const controller = require('../../controllers/payment/yappy.controller');
const controllerInstance = new controller();
const router = Router()
.post(YAPPY_ENDPOINT + "/url", checkIfAuthenticated, controllerInstance.generateUrlMethod)
.get(YAPPY_ENDPOINT + "/id/:id/status/:status", controllerInstance.confirmPayment);

module.exports = router;