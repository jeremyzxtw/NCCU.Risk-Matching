'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {

    res.render('accounting/transfer_token', {
        session: req.session.user_id
    });
});

module.exports = router;
