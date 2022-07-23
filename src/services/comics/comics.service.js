const axios = require("axios").default;
const dbConnection = require('../../db/mysql.config')
class comicsService {

    async comicsInfoService() {
        const [rows, fields] = await connect.execute('call dbsp_getAllComics()');
        return { data: rows};
    }

    async userComicsService({userId}) {
        const [rows, fields] = await connect.execute('call dbsp_getStoreComicsByUserId(?)', [userId]);
        return { data: rows};
    }

}


module.exports = comicsService;