const express = require('express');
const router = express.Router();
const { Links } = require('../model/Link_shortener');

router.route('/:shortlink?').get((req, res) => {
        const sl = req.params.shortlink;
        if (sl === undefined) {
            res.send("URL shortener root/protocol");
        } else {
            Links.findAll({
            where: {
                    label: sl,       
                }
            }).then(result => {
                res.redirect(`https://${result[0].url}`);
            }).catch(err => {
                res.send("URL not found or not registered yet");
                res.status(404);
                res.end();
            })
        }
       
    })

module.exports = router; 