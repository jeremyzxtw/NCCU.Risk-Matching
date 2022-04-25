
var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function (req, res) {
    // use index.pug
    res.render('test', {
        session: req.session.user_id,
        
        plan_StartTime1: 'BANG',
        plan_StartTime2: '2',
        plan_StartTimei: '5'

    });



});




module.exports = router;
