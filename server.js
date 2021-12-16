const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const url = require('url');



const conn = require('./config/database');

const app = express();
const port = 3000;

app.set('views', './public/views');
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));


app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// conn.authenticate().then(() => {
//     console.log("Database connected....");
// }).catch((err) => {
//     console.log(`Error: ${err}`);
// })

// route used
app.use(routes)



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

