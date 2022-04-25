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
					res.render('repair/repair', {
						str_PlanName: '您尚未註冊',
						session: req.session.user_id
					});
				} else {
					connection.query('SELECT * FROM joiner_info WHERE joiner_address = ?', [rows1[0].user_address], function(err, rows2) {
						if (err) {
							res.render('error', {
								message: err.message,
								error: err
							});
						} else if (rows2[0] === undefined) {
							res.render('repair/repair', {
								str_PlanName: '您尚未加入任何方案',
								session: req.session.user_id
							});
						} else {
							var num_Of_rows2 = 0;

							var which_com = [0,0,0,0,0,0,0,0,0,0,0,0];

							console.log(which_com)
							
							
							const payload = {session: req.session.user_id,}
							while (rows2[num_Of_rows2] != null) {
								num_Of_rows2++;
							}
							console.log('共加入幾筆' + num_Of_rows2);
							var fs = require('fs');
							var parse = require('csv-parse');
							var parser = parse({
								columns: true
							}, function(err, records) {
								for (let i = 0; i < num_Of_rows2; i++) {
									
									while (rows2[i].com_sernum != records[which_com[i]].com_sernum) {
										which_com[i]++;
									}
									console.log(records[which_com[i]].com_sernum)
									
								}
								
								for (let i = 0; i < num_Of_rows2; i++) {
									payload[`str_PlanName${i + 1}`] = rows2[i].join_planname;
									payload[`com_Type${i + 1}`] = rows2[i].com_type;
									payload[`com_SerNum${i + 1}`] = rows2[i].com_sernum;
									payload[`com_Status${i+ 1}`] = records[which_com[i]].com_status;
									
								}
							
								console.log(payload)
								
								
								res.render('repair/repair', payload);
								
							});
							fs.createReadStream('C:/Users/User/source/repos/專案/VS Community/Tutorial/Tutorial/com_info.csv').pipe(parser);
						}
					});
				}
			});
			connection.release();
		});
	}
});
router.post('/', function(req, res) {
	var pool = req.connection;
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM user_info WHERE user_id = ?', [req.session.user_id], function(err, rows1) {
			if (err) {
				res.render('error', {
					message: err.message,
					error: err
				});
			} else {
				connection.query('SELECT * FROM joiner_info WHERE joiner_address = ?', [rows1[0].user_address], function(err, rows2) {
					if (err) {
						res.render('error', {
							message: err.message,
							error: err
						});
					} else {
						connection.query('SELECT * FROM com_info WHERE com_sernum = ?', [rows2[req.body.optradio - 1].com_sernum], function(err, rows3) {
							if (err) {
								res.render('error', {
									message: err.message,
									error: err
								});
							} else {
								console.log(rows2[req.body.optradio - 1].com_sernum)
								var header_sernum = rows3[0].com_company + '-' + rows3[0].com_type;
								console.log(rows3[0].com_status);
								if (rows3[0].com_status == "working") {
									rows3[0].com_status = "尚未通知原廠報修";
									return res.render('repair/repair_result', {
										com_Name: rows2[req.body.optradio - 1].com_sernum,
										result: rows3[0].com_status,
										session: req.session.user_id
									});
								} else if (rows3[0].com_status == "inrepair") {
									rows3[0].com_status = "您已通知原廠報修，正在維修中";
									return res.render('repair/repair_result', {
										com_Name: rows2[req.body.optradio - 1].com_sernum,
										result: rows3[0].com_status,
										session: req.session.user_id
									});
								} else if (rows3[0].com_status == "return") {
									rows3[0].com_status = "原廠已維修成功";
									connection.query('UPDATE joiner_info SET repair_result = ? WHERE com_sernum = ?', ['yes', rows2[req.body.optradio - 1].com_sernum], function(err, rows4) {
										if (err) {
											res.render('error', {
												message: err.message,
												error: err
											});
										} else {
											console.log('update success');
											connection.query('SELECT * FROM plan_info WHERE plan_type = ?', [rows3[0].com_type], function(err, rows5) {
												if (err) {
													res.render('error', {
														message: err.message,
														error: err
													});
												} else {
													connection.query('UPDATE plan_info SET plan_repairjoiner = ? WHERE plan_type = ?', [parseInt(rows5[0].plan_repairjoiner) + 1, rows3[0].com_type], function(err, rows6) {
														if (err) {
															res.render('error', {
																message: err.message,
																error: err
															});
														} else {
															console.log('update repairjoiner + 1 success');
															return res.render('repair/repair_result', {
																com_Name: rows2[req.body.optradio - 1].com_sernum,
																result: rows3[0].com_status,
																session: req.session.user_id
															});
														}
													});
												}
											});
										}
									});
								}
							}
						});
					}
				});
			}
		});
		connection.release;
	});
});
module.exports = router;