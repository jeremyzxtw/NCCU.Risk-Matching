'use strict';
var express = require('express');
var router = express.Router();

/* GET login page. */


router.get('/', function (req, res) {
    if (req.session.user_id) {
        req.flash('alert', 'You have already logged in'); //��ܤ��X
        return res.redirect('/');
    }
    else {
        
        return res.render('login/login', { title: 'Express' });
    }
});

router.post('/', function (req, res) {
    var userID = req.body['userid'];
    var userPassword = req.body['password'];
    /* var md5 = crypto.createHash('md5');*/
    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('SELECT user_id FROM user_info WHERE user_id = ?', [userID], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }

            if (rows.length == 0) {
                res.render('login/login');
                console.log('This account hasn'+'t been registered');
           
            }

            // �p�G�����ƪ��b��
            if (rows.length >= 1) {
                connection.query('SELECT * FROM user_info WHERE user_id = ? AND user_password = ?', [userID, userPassword], function (err, rows) {
                    if (rows.length == 0) {
                        res.render('login/login');
                        console.log('�K�X���~');
                    }
                    if (rows.length == 1) {
                        console.log('OK');
                        req.session.user_id = req.body['userid'];
                        req.session.user_password = req.body['password'];
                        

                        res.redirect('/');
                    }
                });
            }
        })
        connection.release();
    });

});

module.exports = router;