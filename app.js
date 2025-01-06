require('dotenv').config()
const express = require('express');
const connectDb = require('./database/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongostore = require('connect-mongo');
const verifyToken = require('./routes/middlewareauth')



const app = express();
const port = 3000;

connectDb();




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'my sec',
    resave: false,
    saveUninitialized: true,
    store: mongostore.create({
        mongoUrl: 'mongodb://localhost:27017/session'
    })
}));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/home', require('./routes/all'));
app.use('/api/v1/post', require('./routes/post'));

app.get('/',(req, res) => {
    res.send('Home page')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});