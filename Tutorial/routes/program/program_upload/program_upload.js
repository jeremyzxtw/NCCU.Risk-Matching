'use strict';
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    if (!req.session.user_id) {
        res.redirect('/login');
    }
    else {
        res.render('program/program_upload/program_upload', {
            session: req.session.user_id
        });
    }

});

module.exports = router;