'use strict';
var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function (req, res) {
    req.flash('info');
    // use index.pug
    res.render('index', {
        session: req.session.user_id,
        status: '123'
    });

});




module.exports = router;
