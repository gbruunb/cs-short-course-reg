const { connection } = require("./DBConnection");


function home(req, res) {
    res.render('home')
}

function signInPage(req, res) {
    res.render('signin')
}

function registerPage(req, res) {
    res.render('register')
}

function register(req, res) {
    const { fname, lname, email, student_id } = req.body;
    try {
      connection.query(
        "INSERT INTO user(fname, lname, email, student_id) VALUE(?,?,?,?)",
        [fname, lname, email, student_id],
        (err, result, fields) => {
          if (err) {
            console.log("insert error");
            console.log(err);
            return res.status(400).send();
          }
          return res
            .status(201)
            .json({ message: "New user created successfully" });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }
module.exports = { home, signInPage, registerPage, register }