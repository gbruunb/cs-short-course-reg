const express = require('express')
const app = express() 
const router = require('./routes/router')
const path = require('path')

const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator')


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended:false }));
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

// app.use(cookieSession({
//     name: 'seesion',
//     key: ['key1','key2'],
//     maxAge: 3600 * 1000 //1hr
// }))

app.listen(8080, () => {
    console.log("Run server at port 8080");
})