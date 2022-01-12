const express = require('express');
const {Links} = require('../model/Link_shortener');
const router = express.Router();

router.route('/').get(function (req, res) {
    const { loggedIn, userId } = req.session;
    /**
     * currently used a trick to prevent user got in without logging in 
     * TODO: fix the authentication
     */
    res.app.locals["loggedIn"] = loggedIn;
    if (userId != undefined) {
        Links.findAll({
            where: {userId: userId}
        }).then(result => {
            res.render("user.ejs", {linkResult: result });
        })    
    } else {
        res.redirect('/login')
    }
    
});

router.route('/new').get(function (req, res) {
    res.render("input-link", {input: true});
}).post(function (req, res) {
    // TODO: fix input validation
    const { link, label } = req.body;
    Links.create({
        userId: req.session.userId,
        url: link,
        label: label
    }).then(result => {
        res.redirect('/user');
    });
});

router.route('/edit/:id').get(function (req, res) {
    Links.findAll({
        where: {
            id: req.params.id,
        }
    }).then(result => {
        res.render("input-link", { input: false, links: result[0] });
    })
}).post(function (req, res) {
    const { link, label } = req.body;
    Links.update({
        url: link,
        label: label,
    },{
        where: {id: req.params.id} 
    }).then(() => {
        res.redirect('/user');
    });
});

router.route('/delete/:id').get(function (req, res) {
    Links.destroy({
        where: {
            id: req.params.id
        }
    }).then(res.redirect('/user'));
});
 
router.route('/logout').get(function (req, res) {
    req.session.destroy();
    res.redirect('/');
}) 
module.exports = router;