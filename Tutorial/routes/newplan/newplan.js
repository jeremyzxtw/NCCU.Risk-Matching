var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var pool = req.connection;
	if (!req.session.user_id) {
		req.flash('message', '您尚未加入任何方案'); //顯示不出
		return res.redirect('/login/login');
	} else {
		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM user_info WHERE user_id = ?', [req.session.user_id], function(err, rows) {
				if (err) {
					res.render('error', {
						message: err.message,
						error: err
					});
				} else {
					var wallet_address = rows[0].user_address;
					res.render('newplan/newplan', {
						addr_Initiater: wallet_address,
						session: req.session.user_id
					});
				}
			})
			connection.release();
		});
	}
});
module.exports = router;