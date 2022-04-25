'use strict';
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    var pool = req.connection;

    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM user_information WHERE user_id = ?', [req.session.user_id], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                res.render('program/program_pause/receipt_program_pause', {
                    session: req.session.user_id,
                    date: req.body.date,
                    tx_hash: req.body.tx_hash,
                    total_exchange: req.body.total_exchange,
                    result: req.body.result,
                    tx_page: "https://ropsten.etherscan.io/tx/" + req.body.tx_hash
                });

            }
        });

        connection.release();

    });

    /*
    res.render('program/receipt_deploy_contract', {
        session: req.session.user_id,
        date: req.body.date,
        tx_hash: req.body.tx_hash,
        total_exchange: req.body.total_exchange,
        result: req.body.result,
        tx_page: "https://ropsten.etherscan.io/tx/" + req.body.tx_hash

    });
    */
});

module.exports = router;