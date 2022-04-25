var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var pool = req.connection;
	if (!req.session.user_id) {
		return res.redirect('/login/login');
	} else {
		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM user_info WHERE user_id = ?', [req.session.user_id], function(err, rows1) {
				if (err) {
					res.render('error', {
						message: err.message,
						error: err
					});
				} else if (rows1[0] === undefined) {
					console.log('請重新註冊');
					return res.redirect('/');
				} else {
					connection.query('SELECT com_sernum FROM com_info WHERE underwriting_id = ?', [req.session.user_id], function(err, rows2) {
						if (err) {
							res.render('error', {
								message: err.message,
								error: err
							});
						} else if (rows2[0] === undefined) {
                            console.log('此使用者尚未核保任何商品');
                            return res.redirect('/');
						} else {
							// 展示使用者已核保的商品給他選商品
							var num_Of_rows2 = 0; // num_Of_rows為select到幾個
							while (rows2[num_Of_rows2] != null) {
								num_Of_rows2++;
							}
							console.log('共select到' + num_Of_rows2 + '個序號');
							const payload = {session: req.session.user_id,}
							for (let i = 0; i < num_Of_rows2; i++) {
								payload[`com_Sernum${i + 1}`] = rows2[i].com_sernum;
							}
							// console.log(payload);
							// 展示給使用者方案 未做已核保的商品之條件下 因為要選很多次
							connection.query('SELECT * FROM plan_info WHERE plan_status = ?', ['on'], function(err, rows3) {
								if (err) {
									res.render('error', {
										message: err.message,
										error: err
									});
								} else if (rows3[0] === undefined) {
									req.flash('test', '目前無任何方案可加入'); //顯示不出
									return res.redirect('/');
								} else {
									var num_Of_rows3 = 0;
									while (rows3[num_Of_rows3] != null) {
										num_Of_rows3++;
									}
									console.log('共select到' + num_Of_rows3 + '個可加入方案');
									for (let i = 0; i < num_Of_rows3; i++) {
										payload[`str_PlanName${i + 1}`] = rows3[i].plan_name;
										payload[`plan_StartTime${i + 1}`] = rows3[i].plan_start;
										payload[`plan_Type${i + 1}`] = rows3[i].plan_type;
										payload[`plan_EndTime${i + 1}`] = rows3[i].plan_end;
										payload[`how_break${i + 1}`] = rows3[i].plan_howbreak;
										payload[`plan_manufacturedate${i + 1}`] = rows3[i].plan_manufacturedate;
										payload[`what_header_sernum${i + 1}`] = rows3[i].plan_what_header_sernum;
									}
									res.render('joinplan/joinplan_choose', payload);
								}
							});
						}
					});
				}
			});
			connection.release();
		});
	}
});
module.exports = router;