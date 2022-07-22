const { Router } = require('express');
const { ALLCOMICS_ENDPOINT } = require('../../utils/endpoints')
const controller = require('../../controllers/comics/comics.controller');

const router = Router()
.get(ALLCOMICS_ENDPOINT, controller.getAllComicsData)
.get(ALLCOMICS_ENDPOINT + "/marvel" ,  controller.getAllComicsData)
.get(ALLCOMICS_ENDPOINT + "/dc" ,  controller.getAllComicsData);


module.exports = router;