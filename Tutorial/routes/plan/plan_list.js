var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	if (!req.session.user_id) {
		res.redirect('/login/login');
	} else {
		var pool = req.connection;
		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM plan_info WHERE plan_status = ?', ["on"], function(err, rows1) {
				if (err) {
					req.flash('test', '目前無任何方案發起'); //顯示不出
					return res.redirect('/');
				} else {
					var num_Of_rows1 = 0;
					while (rows1[num_Of_rows1] != null) {
						num_Of_rows1++;
					}
					console.log(num_Of_rows1);
					const payload = {session: req.session.user_id,}
					for (let i = 0; i < num_Of_rows1; i++) {
						payload[`str_PlanName${i + 1}`] = rows1[i].plan_name;
						payload[`plan_Hash${i + 1}`] = rows1[i].plan_create_hash;
						payload[`plan_Type${i + 1}`] = rows1[i].plan_type;
						payload[`plan_StartTime${i + 1}`] = rows1[i].plan_start;
						
						payload[`plan_EndTime${i + 1}`] = rows1[i].plan_end;
						payload[`how_break${i + 1}`] = rows1[i].plan_howbreak;
						payload[`plan_manufacturedate${i + 1}`] = rows1[i].plan_manufacturedate;
						payload[`what_header_sernum${i + 1}`] = rows1[i].plan_what_header_sernum;
						payload[`plan_totaljoiner${i + 1}`] = rows1[i].plan_totaljoiner;
						payload[`plan_repairedjoiner${i + 1}`] = rows1[i].plan_repairjoiner;
						payload[`plan_status${i + 1}`] = rows1[i].plan_status;
						
					}
					res.render('plan/plan_list', payload);
				}
			});
			connection.release();
		});
		
	}
	

	
});
module.exports = router;