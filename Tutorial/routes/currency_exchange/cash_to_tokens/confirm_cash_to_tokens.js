'use strict';
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    res.render('currency_exchange/cash_to_tokens/confirm_cash_to_tokens', {
        session: req.session.user_id,
        total_exchange: req.body.cash_to_tokens
    });
});

module.exports = router;