const axios = require("axios").default;
const connect = require('../../db/mysql.config')

class comicsService {

  async comicsInfoService() {
    const date = new Date();
    const currentTime = date.getTime();
    const cacheExpiration = date.getTime() + (60 * 60 * 24 * 30 * 1000);

    const [rows, fields] = await connect.execute('call dbsp_getData()');
    
    console.log(rows);
    
    return { data: rows, isCached: false };
  }
}
module.exports = comicsService;