const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// router path
const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const linksRoute = require('./routes/links');
const userRoute = require('./routes/user');


const conn = require('./config/database');


const app = express();
const port = 3000;

app.set('views', './public/views');
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie:{secure: false}
}));

const logger = (req, res, next) => {
    const date = new Date();
    console.log(`Action initiated at time: ${date.getHours()}:${date.getMinutes()}`);
    next();
};


const authUser = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }
    next();
};

const validateField = (req, res, next) => {
    res.app.locals.fieldError = [];
    const fieldObject = req.body;
    for (let i in fieldObject) {
        if (fieldObject[i] == "") { 
            req.app.locals.fieldError.push(`Field ${i} cannot be empty`);
        }
    }
    next();
}


// middleware used
app.use(logger);
app.use('/user', authUser, validateField);
 
// route used
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/l', linksRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    conn.sync();
});

