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
        if (myCache.has(stageId)) {
            return { data: myCache.get(stageId), isCached: true };
        }
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getAllComicsByStageID(?)', true, [stageId])
        myCache.set(stageId, rows, 60*60*24);
        return { data: rows, isCached: false };
    }

    async userComicsService({authId}) {
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getStoreComicsByUserId(?)', true, [authId])
        return { data: rows, isCached: false };
    }

    async ComicInfoService({idComic}) {
        if (myCache.has(idComic)) {
            return { data: myCache.get(idComic), isCached: true };
        }
        const [rows, fields] = await dbConnection.queryDB('call dbsp_getComicsByComicId(?)', true, [idComic])
        myCache.set(idComic, rows, 60*60*24);
        return { data: rows, isCached: false };
    }

}


module.exports = ComicsService;