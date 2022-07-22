const axios = require("axios").default;
const connect = require('../../db/mysql.config')

class comicsService {

    async comicsInfoService() {
        const [rows, fields] = await connect.execute('call dbsp_getAllComics()');
        console.log("Database Response: " + JSON.stringify(rows));
        return { data: rows, isCached: false };
    }

    async userComicsService({userId}) {
        const [rows, fields] = await connect.execute('call dbsp_getStoreComicsByUserId(?)', [userId]);
        console.log("Database Response: " + JSON.stringify(rows));
        return { data: rows, isCached: false };
    }

}
module.exports = comicsService;