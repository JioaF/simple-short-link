const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        //res.send("Hello World");
        res.render('index.ejs', {title: "SSL"});
    }).post((req, res) => { 
    
})

module.exports = router;