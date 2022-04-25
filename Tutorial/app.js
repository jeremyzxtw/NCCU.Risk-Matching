'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');//session
var flash = require('connect-flash');
var upload = require('express-fileupload');

var routes = require('./routes/index');

var test = require('./routes/test');

var plan_list = require('./routes/plan/plan_list');
var newplan = require('./routes/newplan/newplan');
var newplan_result = require('./routes/newplan/newplan_result');

var joinplan_choose = require('./routes/joinplan/joinplan_choose');
var joinplan_do = require('./routes/joinplan/joinplan_do');
var joinplan_certificate = require('./routes/joinplan/joinplan_certificate');
var underwriting_serialnumber = require('./routes/joinplan/underwriting_serialnumber');
var underwriting_result = require('./routes/joinplan/underwriting_result');
var underwriting_transfer = require('./routes/joinplan/underwriting_transfer');

var register = require('./routes/register'); //無用

var accounting = require('./routes/accounting/accounting');
var accounting_comfirm = require('./routes/accounting/accounting_comfirm');
var transfer_token = require('./routes/accounting/transfer_token');

var sign = require('./routes/sign/sign');
var login = require('./routes/login/login');
var logout = require('./routes/logout/logout');

var member_info =  require('./routes/member/member_info');

var repair = require('./routes/repair/repair');
var repair_result = require('./routes/repair/repair_result');

var currency_exchange = require('./routes/currency_exchange/currency_exchange');

var confirm_tokens_to_cash = require('./routes/currency_exchange/tokens_to_cash/confirm_tokens_to_cash');
var confirm_cash_to_tokens = require('./routes/currency_exchange/cash_to_tokens/confirm_cash_to_tokens');
var processing_tokens_to_cash = require('./routes/currency_exchange/tokens_to_cash/processing_tokens_to_cash');

var receipt_tokens_to_cash = require('./routes/currency_exchange/tokens_to_cash/receipt_tokens_to_cash');
var receipt_cash_to_tokens = require('./routes/currency_exchange/cash_to_tokens/receipt_cash_to_tokens');

var erc865 = require('./routes/erc865/erc865');


// DataBase
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tutorial'
    
});

pool.getConnection(function (err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
//app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'iloveu',}));
// app.use(session({cookie: { maxAge: 60000 }}));

app.use(flash());
app.use(upload());
/*
app.use(session({
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true,
    cookie: { maxAge: 5000 }
}));
*/

// Database state
app.use(function (req, res, next) {
    req.connection = pool;
    next();
});

// flash
app.use(function (req, res, next) {
    res.locals.alert = req.flash('alert');
    res.locals.infos = req.flash('info');
    next();
});

app.use('/', routes);
app.use('/register', register); //無用


app.use('/test', test);

app.use('/plan/plan_list', plan_list);

app.use('/member/member_info', member_info);

app.use('/accounting/accounting', accounting);
app.use('/accounting/accounting_comfirm', accounting_comfirm);
app.use('/accounting/transfer_token', transfer_token);

app.use('/newplan/newplan', newplan);
app.use('/newplan/newplan_result', newplan_result);

app.use('/joinplan/joinplan_choose', joinplan_choose);
app.use('/joinplan/joinplan_do', joinplan_do);
app.use('/joinplan/joinplan_certificate', joinplan_certificate);
app.use('/joinplan/underwriting_serialnumber', underwriting_serialnumber);
app.use('/joinplan/underwriting_result', underwriting_result);
app.use('/joinplan/underwriting_transfer', underwriting_transfer);

app.use('/sign/sign', sign);
app.use('/login/login', login);
app.use('/logout/logout', logout);

app.use('/repair/repair', repair);
app.use('/repair/repair_result', repair_result);

app.use('/currency_exchange/currency_exchange', currency_exchange);

app.use('/currency_exchange/cash_to_tokens/confirm_cash_to_tokens', confirm_cash_to_tokens);
app.use('/currency_exchange/tokens_to_cash/confirm_tokens_to_cash', confirm_tokens_to_cash);

app.use('/currency_exchange/tokens_to_cash/processing_tokens_to_cash', processing_tokens_to_cash);

app.use('/currency_exchange/cash_to_tokens/receipt_cash_to_tokens', receipt_cash_to_tokens);
app.use('/currency_exchange/tokens_to_cash/receipt_tokens_to_cash', receipt_tokens_to_cash);

app.use('/erc865/erc865', erc865);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// 非固定IP
 
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


var fs = require('fs');
var http = require('http');
var https = require('https');

/*
var server = http.createServer(app);
server.listen(80, '140.119.143.42', function () {
    server.close(function () {
        server.listen(80, '140.119.143.42')
    })
})
*/

