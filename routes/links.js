const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('../scratch');

router.route('/:shortlink?').get((req, res) => {
        const sl = req.params.shortLink;
        if (sl === undefined) {
            res.render('new-local', { savedLink: localStorage });
        } else {
            console.log(`Redirected to https://${localStorage.getItem(`${sl}`)}`);
            res.redirect(`https://${localStorage.getItem(`${sl}`)}`);
            res.end();
        }
    }).post((req, res) => {
        const { link, masked } = req.body;
        localStorage.setItem(`${masked}`, `${link}`);
        res.redirect('/');
        
    });

module.exports = router; 