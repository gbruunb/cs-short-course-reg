const { connection } = require("./DBConnection");
const bcrypt = require("bcrypt")


function home(req, res) {
    res.render('home')
}

function signInPage(req, res) {
    res.render('signin')
}

function registerPage(req, res) {
    res.render('register')
}

async function register(req, res) {
    const { prefix, fname, lname, nickname, years, student_id, email, password, confirm_password } = req.body;
    try {
      const hash_password = await bcrypt.hash(password, 12)
      connection.query(
        "INSERT INTO users(prefix_name, fname, lname, nickname, years, student_id, email, password) VALUE(?,?,?,?,?,?,?,?)",
        [prefix, fname, lname, nickname, years, student_id, email, hash_password],
        (err, result, fields) => {
          if (err) {
            console.log("insert error");
            console.log(err);
            return res.status(400).send();
          }
          return res.redirect("/signin")        
        }
      );
    } catch (error) {
      console.log(error);
      return res.redirect("/register_page")
    }
  }
module.exports = { home, signInPage, registerPage, register }