var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	// use underwriting_result.pug
	if (!req.session.user_id) {
		res.redirect('/login/login');
	} else {
		res.render('joinplan/underwriting_result', {
			session: req.session.user_id
		});
	}
});
router.post('/', function(req, res, next) {
	var company = req.body.Company;
	var product = req.body.Product;
	var factory_date = req.body.Factory_date;
	var warranty_time = req.body.Warranty_time;
	var serial_number = company + '-' + product + '-' + factory_date + '-' + warranty_time;
	var id = req.session.user_id;
	console.log(id);
	var pool = req.connection;
	pool.getConnection(function(err, connection) {
		if (err) {
			res.render('error', {
				message: err.message,
				error: err
			});
		} else {
			connection.query('SELECT * FROM com_info WHERE com_sernum = ?', [serial_number], function(err, rows1) {
				if (err) {
					res.render('error', {
						message: err.message,
						error: err
					});
				} else {
					if (rows1[0] === undefined) {
						res.render('joinplan/underwriting_result', {
							result: '驗證序號失敗，請確認商品序號及格式是否正確。',
							session: req.session.user_id
						});
					} else {
						connection.query('UPDATE com_info SET if_underwriting = ? , underwriting_id = ? WHERE com_sernum = ?', ['yes', id, serial_number], function(err, rows2) {
							if (err) {
								res.render('error', {
									message: err.message,
									error: err
								});
							} else {
								console.log('update database success');
								res.render('joinplan/underwriting_result', {
									result: '核保成功，您的商品價值為 ' + rows1[0].price,
									session: req.session.user_id
								});
							}
						})
						// connection.release();
					}
				}
			})
			
		}
		connection.release();
	}); 
});
module.exports = router;