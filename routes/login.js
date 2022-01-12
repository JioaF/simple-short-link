const express = require('express');
const router = express.Router();
const {Users} = require('../model/Link_shortener');

const error = [];

router.route('/').get((req, res) => {
    res.render('login.ejs', {error: error, loginStatus: false});
}).post((req, res) => {

    const { username, password } = req.body;
    if (username == "" || password == "") {
        error.push("Username or Password Field cannot be Empty!");
        res.redirect('/login');
    } else {
        Users.findAll({
            where: { username: username, password: password }
        }).then((result) => {
            if (result.length > 0) {
                req.session.loggedIn = true;
                req.session.userId = result[0].id;
                res.redirect('/user');
            } else {
                error.push("User is not found, make sure you are Registered");
                res.redirect('/login');
            }
        });
    }
})

module.exports = router;