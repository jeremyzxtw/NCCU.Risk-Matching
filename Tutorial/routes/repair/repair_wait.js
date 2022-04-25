'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('repair/repair_wait');
    req.session.destroy();
});

module.exports = router;