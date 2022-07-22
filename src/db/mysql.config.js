
const mysql = require('mysql2');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST || "bmuhtfqfof4jojuatuzm-mysql.services.clever-cloud.com",
    user: process.env.MYSQL_ADDON_USER || "uv1w0skiejiuphq3",
    password: process.env.MYSQL_ADDON_PASSWORD || "DGblKw7dWQNP8uLXjgFC",
    database: process.env.MYSQL_ADDON_DB || "bmuhtfqfof4jojuatuzm"
});

pool.getConnection((err, connection) => {

    if (err) {

        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error('Database connection was closed');
        }

        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error('Database has to many connections');
        }

        if (err.code === "ECONNREFUSED") {
            console.error('Database connection was refused');
        }
    }

    if (connection) connection.release();
    console.log("Database is connected");
    return;

})

pool.execute = promisify(pool.execute);


module.exports = pool