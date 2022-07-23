const axios = require("axios").default;
const dbConnection = require('../../db/mysql.config')
class comicsService {

    async comicsInfoService() {
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getAllComics()', true)
        console.log("Database Response: " + JSON.stringify(rows));
        return { data: rows, isCached: false };
    }

    async userComicsService({authId}) {
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getStoreComicsByUserId(?)', true, [authId])
        console.log("Database Response: " + JSON.stringify(rows));
        return { data: rows, isCached: false };
    }

}
module.exports = comicsService;