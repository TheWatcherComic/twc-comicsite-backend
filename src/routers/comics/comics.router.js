const { Router } = require('express');
const { ALLCOMICS_ENDPOINT, COMICS_ENDPOINT,STAGECOMICS_ENDPOINT } = require('../../utils/endpoints')
const checkIfAuthenticated = require('../../middlewares/authentication.middleware');
const controller = require('../../controllers/comics/comics.controller');
const controllerInstance = new controller();

const router = Router()
.get(ALLCOMICS_ENDPOINT, checkIfAuthenticated, controllerInstance.getAllComicsData)
.post(COMICS_ENDPOINT, checkIfAuthenticated, controllerInstance.comicInfoController)
.post(ALLCOMICS_ENDPOINT, checkIfAuthenticated, controllerInstance.userComicsController)
.post(STAGECOMICS_ENDPOINT, checkIfAuthenticated, controllerInstance.stageComicsData)

module.exports = router;