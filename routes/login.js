const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const UserModel = require('../model/Link_shortener');


router.route('/').get((req, res) => {
    let error = [];
    res.render('login.ejs', {error: error});
}).post((req, res) => {
    const { username, password } = req.body;
    UserModel.findAll({
        where: { username : username, password : password }
    }).then((result) => {
        if (result.length > 0) {
            redirect('/user');
        } else {
            error.push("User is not found, make sure you are Registered");
            res.redirect('/login');
        }
    })
    res.end();
})

module.exports = router;