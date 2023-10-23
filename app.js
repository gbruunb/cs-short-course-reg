const express = require('express')
const app = express() 
const router = require('./routes/router')
const path = require('path')
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { connection } = require('./controllers/DBConnection')

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended:false }));
app.use(router)
app.use(express.static(path.join(__dirname,'public')))


app.post('/auth', function(request, response) {
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
				response.redirect('/course-list');
			} else {
				response.send('Incorrect student_id and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter student_id and Password!');
		response.end();
	}
});


app.listen(8080, () => {
    console.log("Run server at port 8080");
})