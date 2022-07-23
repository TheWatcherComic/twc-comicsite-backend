const { Router } = require('express');
const { ALLCOMICS_ENDPOINT, COMICS_ENDPOINT } = require('../../utils/endpoints')
const checkIfAuthenticated = require('../../middlewares/authentication.middleware');
const controller = require('../../controllers/comics/comics.controller');
const controllerInstance = new controller();

const router = Router()
.get(ALLCOMICS_ENDPOINT, controllerInstance.getAllComicsData)
.post(ALLCOMICS_ENDPOINT, checkIfAuthenticated, controllerInstance.userComicsController)
.get(ALLCOMICS_ENDPOINT + "/marvel" ,  controllerInstance.getAllComicsData)
.get(ALLCOMICS_ENDPOINT + "/dc" ,  controllerInstance.getAllComicsData);


module.exports = router;