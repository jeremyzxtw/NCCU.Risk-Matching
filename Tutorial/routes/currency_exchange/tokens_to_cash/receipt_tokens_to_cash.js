'use strict';
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    res.render('currency_exchange/tokens_to_cash/receipt_tokens_to_cash', {
        session: req.session.user_id,
        date: req.body.date,
        tx_hash: req.body.tx_hash,
        total_exchange: req.body.total_exchange,
        result: req.body.result,
        tx_page: "https://ropsten.etherscan.io/tx/" + req.body.tx_hash

    });
});

module.exports = router;