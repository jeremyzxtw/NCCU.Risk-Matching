var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    res.render('accounting/accounting_comfirm', {
        session: req.session.user_id,
    });
});

router.post('/', function(req, res) {
	console.log('欲結算第'+ req.body.optradio1 + '個方案');
	var pool = req.connection;
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM plan_info WHERE plan_status = ?', ['on'], function(err, rows1) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else if (rows1[0] === undefined) {
                console.log('undefined');
            }
            else {
                var opt_type = rows1[req.body.optradio1 - 1].plan_type;
                var opt_totaljoiner = rows1[req.body.optradio1 - 1].plan_totaljoiner;
                var opt_repairjoiner = rows1[req.body.optradio1 - 1].plan_repairhoiner;
                console.log('此方案為' + opt_type) ;
 
                connection.query('SELECT * FROM com_info WHERE com_type = ? AND com_status = ? AND if_underwriting = ?', [opt_type, 'return', 'yes'], function(err, rows2) {
                    if (err) {
                        res.render('error', {
                            message: err.message,
                            error: err
                        });
                    }
                    else {
                        var num_Of_repair = 0;
                        while (rows2[num_Of_repair] != null){
                            num_Of_repair ++;
                        }
                        console.log('保固人數為:' + num_Of_repair);
                        for (var i = 0; i < num_Of_repair; i++) {
                            console.log('ID為:' + rows2[i].underwriting_id);
                        }

                        connection.query('SELECT * FROM com_info WHERE  com_type = ? AND com_status = ? AND if_underwriting = ?', [ opt_type, 'working', 'yes'], function(err, rows3) {
                            if (err) {
                                res.render('error', {
                                    message: err.message,
                                    error: err
                                });
                            }
                            else {
                                var num_Of_UNrepair = 0;
                                while (rows3[num_Of_UNrepair] != null){
                                    num_Of_UNrepair ++;
                                }
                                console.log('未保固人數為:' + num_Of_UNrepair);
                                for (var i = 0; i < num_Of_UNrepair; i++) {
                                    console.log('ID為:' + rows3[i].underwriting_id);
                                }

                                const payload = {
                                    num_Of_repair: num_Of_repair,
                                    num_Of_UNrepair: num_Of_UNrepair,
                                    session: req.session.user_id,
                                }
                                price_Of_UNrepair = 0
                                for (let i = 0; i < num_Of_repair; i++) {
                                    payload[`id_Of_repair${i + 1}`] = rows2[i].underwriting_id;
                                    payload[`sernum_Of_repair${i + 1}`] = rows2[i].com_sernum;
                                    payload[`price_Of_repair${i + 1}`] = rows2[i].price;

                                    price_Of_UNrepair = price_Of_UNrepair + rows2[i].price
                                }
                                price_Of_UNrepair = price_Of_UNrepair / num_Of_UNrepair 
                                price_Of_UNrepair = price_Of_UNrepair * 1.1
                                for (let i = 0; i < num_Of_UNrepair; i++) {
                                    payload[`id_Of_UNrepair${i + 1}`] = rows3[i].underwriting_id;
                                    payload[`sernum_Of_UNrepair${i + 1}`] = rows3[i].com_sernum;
                                    payload[`price_Of_UNrepair${i + 1}`] = price_Of_UNrepair;
                                }
                                connection.query('UPDATE plan_info SET plan_status = ? WHERE plan_type = ?', ['off', opt_type], function(err, rows4) {
                                    if (err) {
                                        res.render('error', {
                                            message: err.message,
                                            error: err
                                        });
                                    } else {
                                        console.log('update plan_info off success');
                                        connection.query('UPDATE joiner_info SET plan_status = ? WHERE  com_type = ?', ['off', opt_type], function(err, rows5) {
                                            if (err) {
                                                res.render('error', {
                                                    message: err.message,
                                                    error: err
                                                });
                                            } else {
                                                for (let i = 0; i < num_Of_UNrepair; i++) {
                                                    connection.query('UPDATE user_info SET user_status = ? WHERE user_id = ?', [price_Of_UNrepair, rows3[i].underwriting_id], function(err, rows6) {
                                                    });
                                                }
                                                
                                                console.log('update joiner_info off success');
                                                res.render('accounting/accounting_comfirm', payload);
                                                
                                            }
                                        })
                                        
                                        
                                    }
                                })
                                
                            }
                        });
                    }
                });
            }
        });
        connection.release();
    });
});

module.exports = router;