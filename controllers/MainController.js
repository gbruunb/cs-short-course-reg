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

  function auth(request, response) {
    // Capture the input fields
    let student_id = request.body.student_id;
    let password = request.body.years;
    // Ensure the input fields exists and are not empty
    if (student_id && password) {
      // Execute SQL query that'll select the account from the database based on the specified student_id and password
      connection.query('SELECT * FROM users WHERE student_id = ? AND years = ?', [student_id, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.student_id = student_id;
          // Redirect to home page
          response.redirect('/course-list',{ student_id: request.session.student_id},302);
        } else {
          response.send('Incorrect student_id and/or Password!');
        }			
        response.end();
      });
    } else {
      response.send('Please enter student_id and Password!');
      response.end();
    }
  }

module.exports = { home, signInPage, registerPage, register, auth }