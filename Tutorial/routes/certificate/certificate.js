'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    // use index.pug
    res.render('certificate/certificate', {
        session: req.session.user_id,
        x: "BANG"
    });

});
module.exports = router;