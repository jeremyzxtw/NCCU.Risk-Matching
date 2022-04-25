'use strict';
var express = require('express');
var router = express.Router();


/*建立user物件*/
function User(user) {
    this.userid = user.userid;
    this.userpassword = user.userpassword;
    this.userwalletaddress = user.userwalletaddress;

};

var crypto = require('crypto');
var TITLE_REG = '註冊';


/* GET sign page. */
router.get('/', function (req, res) {
    res.render('sign/sign', { title: TITLE_REG });
});


router.post('/', function (req, res) {
    var userID = req.body['userid'];
    var userPassword = req.body['password'];
    var userRePassword = req.body['confirm_password'];

    var userWallet_Address = req.body['useraddress'];
    /*var md5 = crypto.createHash('md5');

    var userPwd = md5.update(userPwd).digest('hex'); */

    var newUser = new User({
        userid: userID,
        userpassword: userPassword,

        userwalletaddress: userWallet_Address
    });

    /*寫入新資料*/
    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('SELECT user_id FROM user_info WHERE user_id = ?', [newUser.userid], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            // 如果有重複的帳號
            if (rows.length >= 1) {
                
                res.render('sign/sign', { warn: "This account is already being used" });
                
            } else {

                var cmd = "INSERT INTO user_info(user_id, user_password, user_address) VALUES(?,?,?)";
                connection.query(cmd, [newUser.userid, newUser.userpassword, newUser.userwalletaddress], function (err, result) {
                    if (err) {
                        res.redirect('sign/sign');
                        console.log('insert failed');
                    } else {
                        res.render('sign/sign');
                        console.log('insert success');
                    }

                });
            }
        })
        connection.release();
    });
});






module.exports = router;