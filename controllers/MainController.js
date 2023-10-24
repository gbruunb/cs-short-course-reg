const { connection } = require("./DBConnection");

function home(req, res) {
    res.render('home')
}

module.exports = { home }