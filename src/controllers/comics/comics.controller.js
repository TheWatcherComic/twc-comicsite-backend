const service = require('../../services/comics/comics.service');
const serviceInstance = new service();

class ComicsController {

    async getAllComicsData(req,res) {
        try {
            const AllComicsData = await serviceInstance.allcomicsService();
            return res.status(200).send(AllComicsData);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async stageComicsData(req,res) {
        try {
            const response = await serviceInstance.stageComicsService(req.body);
            return res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async userComicsController(req, res) {
        try {
            const response = await serviceInstance.userComicsService(req);
            return res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async comicInfoController(req, res) {
        try {
            const response = await serviceInstance.ComicInfoService(req.body);
            return res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = ComicsController;
