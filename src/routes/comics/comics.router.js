const { Router } = require('express');
const { ALLCOMICS_ENDPOINT, COMICS_ENDPOINT } = require('../../utils/endpoints')
const controller = require('../../controllers/comics/comics.controller');
const controllerInstance = new controller();

const router = Router()
.get(ALLCOMICS_ENDPOINT, controllerInstance.getAllComicsData)
.post(ALLCOMICS_ENDPOINT, controllerInstance.userComicsController)
.get(ALLCOMICS_ENDPOINT + "/marvel" ,  controllerInstance.getAllComicsData)
.get(ALLCOMICS_ENDPOINT + "/dc" ,  controllerInstance.getAllComicsData);


module.exports = router;