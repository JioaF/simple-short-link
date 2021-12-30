const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// router path
const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const linksRoute = require('./routes/links');


const conn = require('./config/database');

const app = express();
const port = 3000;

app.set('views', './public/views');
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'some-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

var logger = (req, res, next) => {
    const date = new Date();
    console.log(`Action initiated at time: ${date.getHours()}:${date.getMinutes()}`);
    next();
}

let authLogin = (req, res, next) => {
    if (!session.loggedin) {
        res.redirect('/');
    }
    next();
}

// middleware used
app.use(logger)

// route used
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/l', linksRoute);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    conn.sync();
});

