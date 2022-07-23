const axios = require("axios").default;
const dbConnection = require('../../db/mysql.config')
class comicsService {

    async comicsInfoService() {
        
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getAllComics()', true)
        return { data: rows};
    }

    async userComicsService({userId}) {
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getStoreComicsByUserId(?)', true, [userId])
        return { data: rows};
    }

}


module.exports = comicsService;