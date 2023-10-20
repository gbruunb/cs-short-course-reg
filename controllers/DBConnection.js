const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cs_short_course',
    port:'3306'
})

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database",err)
        return;
    }
    console.log("MySQL successfull connect")
})

module.exports = { connection }