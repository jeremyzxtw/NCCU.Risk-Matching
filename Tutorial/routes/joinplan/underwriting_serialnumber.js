var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
	// use underwriting_serialnumber.pug
	if (!req.session.user_id) {
		res.redirect('/login/login');
	} else {
		res.render('joinplan/underwriting_serialnumber', {
			session: req.session.user_id
		});
	}
});
module.exports = router;