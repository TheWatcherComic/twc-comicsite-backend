const service = require('../../services/comics/comics.service');
const serviceInstance = new service();

exports.getAllComicsData = async function(req, res) {
    try {
        const AllComicsData = await serviceInstance.comicsInfoService();
        return res.status(200).send( AllComicsData );
    } catch (err) {
        res.status(500).send(err);
    }s

}