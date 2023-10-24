const { connection } = require("./DBConnection");
const bcrypt = require("bcrypt")


function home(req, res) {
    res.render('home')
}

module.exports = { home }