const service = require('../../services/comics/comics.service');
const serviceInstance = new service();

class ComicsController {

    async getAllComicsData(req, res, next) {
        try {
            const AllComicsData = await serviceInstance.allcomicsService();
            return res.status(200).send(AllComicsData);
        } catch (err) {
            console.log("Error: " + err.message);
            err.message = "Error encountered while retrieving all comics data"
            next(err);
        }
    }

    async userComicsController(req, res, next) {
        try {
            const response = await serviceInstance.userComicsService(req);
            return res.status(200).send(response);
        } catch (err) {
            console.log("Error: " + err.message);
            err.message = "Error encountered while retrieving user comics data"
            next(err);
        }
    }

    async comicInfoController(req, res, next) {
        try {
            const response = await serviceInstance.ComicInfoService(req.body);
            return res.status(200).send(response);
        } catch (err) {
            console.log("Error: " + err.message);
            err.message = "Error encountered while retrieving comic info data"
            next(err);
        }
    }
}

module.exports = ComicsController;
