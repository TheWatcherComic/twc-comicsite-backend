const mysql = require('mysql2');

const dbPool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
});

async function queryDB(query, useExecute, args) {
    console.log('query: ' + query);
    return new Promise((resolve, reject) => {
        if(undefined !== args) {
            for (let i = 0; i < args.length; ++i) {
                if (args[i] === undefined) {
                    args[i] = null;
                }
            }
        }
        dbPool.getConnection((err, conn) => {
            if (err) {
                reject(err);
                return;
            }
            let cb = function (err, results, fields) {
                conn.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            }
            if (useExecute)
                conn.execute(query, args, cb);
            else
                conn.query(query, args, cb);
        });
    });
}
module.exports.queryDB = queryDB;
