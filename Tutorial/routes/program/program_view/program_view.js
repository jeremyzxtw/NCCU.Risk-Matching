'use strict';
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('program/program_view/program_view', { session: req.session.user_id });
});

router.post('/', function (req, res) {
    res.render('program/program_view/program_view', { session: req.session.user_id, bang: req.body.code });
});

module.exports = router;