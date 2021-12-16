const express = require('express');
const router = express.Router();
const Unsignup = require('../model/Link_shortener');
const conn = require('../config/database');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('../scratch');
const url = require('url')

router.route('/:shortLink?')
    .get((req, res) => {
        const sl = req.params.shortLink;
        if (sl === undefined) {
            console.log(req.originalUrl);
            res.render('index.ejs', { title: "SSL", savedLink: localStorage });
        } else {
            console.log(`Redirected to https://${localStorage.getItem(`${sl}`)}`);
            res.redirect(`https://${localStorage.getItem(`${sl}`)}`);
            res.end();
        }
    }).post((req, res) => {
        const { link, masked } = req.body;
        localStorage.setItem(`${masked}`, `${link}`);
        res.redirect('/');
        
    })

module.exports = router; 