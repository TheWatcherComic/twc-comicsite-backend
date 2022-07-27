const axios = require("axios").default;
const dbConnection = require('../../db/mysql.config')
const NodeCache = require("node-cache");
const myCache = new NodeCache();
class ComicsService {

    async allcomicsService() {
        if (myCache.has("comicsList")) {
            return { data: myCache.get("comicsList"), isCached: true };
        }
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getAllComics()', true)
        myCache.set("comicsList", rows, 60*60*24);
        return { data: rows, isCached: false };
    }

    async stageComicsService({stageId}) {
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getAllComicsByStageID(?)', true, [stageId])
        return { data: rows, isCached: false };
    }

    async userComicsService({authId}) {
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getStoreComicsByUserId(?)', true, [authId])
        return { data: rows, isCached: false };
    }

    async ComicInfoService({idComic}) {
        if (myCache.has("comicData")) {
            return { data: myCache.get("comicData"), isCached: true };
        }
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getComicsByComicId(?)', true, [idComic])
        myCache.set("comicData", rows, 60*60*24);
        return { data: rows, isCached: false };
    }

}


module.exports = ComicsService;