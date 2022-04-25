var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction; //簽署合約 以下都是固定寫法
const testnet = 'https://ropsten.infura.io/v3/b4946971370c4cde80aa1dfaeb1989a0';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet)); //串以太坊

var contract_address = "0x762e62e43de6e2217cd15a48ec6d3dbfe8849a01";
var contractABI = [{"constant":false,"inputs":[{"name":"_strPlanName","type":"string"},{"name":"_addrInitiater","type":"address"}],"name":"ActivePlan","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_strPlanName","type":"string"},{"name":"_addrInitiater","type":"address"}],"name":"inActivePlan","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addrJoiner","type":"address"},{"name":"_strPlanName","type":"string"},{"name":"_comName","type":"string"},{"name":"_comSerNum","type":"string"}],"name":"JoinPlan","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addrInitiater","type":"address"},{"name":"_strPlanName","type":"string"},{"name":"_planPrice","type":"uint256"}],"name":"NewPlan","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addrInitiater","type":"address"},{"name":"_addrJoiner","type":"address"},{"name":"_numtime","type":"uint256"}],"name":"Repair","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addrInitiater","type":"address"},{"indexed":false,"name":"strPlanName","type":"string"},{"indexed":false,"name":"planPrice","type":"uint256"}],"name":"eventNewPlan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"strPlanName","type":"string"},{"indexed":false,"name":"addrInitiater","type":"address"}],"name":"eventinActive","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"strPlanName","type":"string"},{"indexed":false,"name":"addrInitiater","type":"address"}],"name":"eventActive","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addrJoiner","type":"address"},{"indexed":false,"name":"strPlanName","type":"string"},{"indexed":false,"name":"comName","type":"string"},{"indexed":false,"name":"comSerNum","type":"string"}],"name":"eventJoinPlan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addrJoiner","type":"address"},{"indexed":false,"name":"numtime","type":"uint256"}],"name":"eventifUnderWriting","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addrJoiner","type":"address"},{"indexed":false,"name":"numtime","type":"uint256"}],"name":"eventRepair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addrJoiner","type":"address"}],"name":"eventVerifysubject","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addrInitiater","type":"address"},{"indexed":false,"name":"numtime","type":"uint256"}],"name":"eventAccounting","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"}],"name":"eventConstructor","type":"event"},{"constant":true,"inputs":[{"name":"_addrInitiater","type":"address"},{"name":"_numtime","type":"uint256"}],"name":"Accounting","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addrJoiner","type":"address"},{"name":"_numtime","type":"uint256"}],"name":"ifUnderWriting","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"joiner","outputs":[{"name":"addrJoiner","type":"address"},{"name":"planNameofJoiner","type":"string"},{"name":"comName","type":"string"},{"name":"comSerNum","type":"string"},{"name":"ifJoinSuc","type":"bool"},{"name":"ifRepairSuc","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"JoinerInfo","outputs":[{"name":"addrJoiner","type":"address"},{"name":"planNameofJoiner","type":"string"},{"name":"comName","type":"string"},{"name":"comSerNum","type":"string"},{"name":"ifJoinSuc","type":"bool"},{"name":"ifRepairSuc","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"NumOfTimeForAddress","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"plan","outputs":[{"name":"strPlanName","type":"string"},{"name":"planStatus","type":"bool"},{"name":"planStartTime","type":"uint256"},{"name":"planEndTime","type":"uint256"},{"name":"numPeople","type":"uint256"},{"name":"numRepairedPeople","type":"uint256"},{"name":"planPrice","type":"uint256"},{"name":"addrInitiater","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"PlanInfoForAddress","outputs":[{"name":"strPlanName","type":"string"},{"name":"planStatus","type":"bool"},{"name":"planStartTime","type":"uint256"},{"name":"planEndTime","type":"uint256"},{"name":"numPeople","type":"uint256"},{"name":"numRepairedPeople","type":"uint256"},{"name":"planPrice","type":"uint256"},{"name":"addrInitiater","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
var contract = web3.eth.contract(contractABI).at(contract_address);

var owner_private_key = "73f5a26ae2588f4478e99d48608cd87824a44dc6513bee917b055775329089ac";
var owner_address = "0x27556e0d5351236d1361D7A6524E65d83B2B629c";

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('newplan/newplan_result', {
		session: req.session.user_id
		
	});
});

router.post('/', function(req, res) {
	// for contract
	var planPrice = 1;

	// for database
	var addrInitiater = req.body.addr_Initiater;
	var strPlanName = 'default';
	var comCategory = req.body.com_Category;
	var howBreak = req.body.how_Break;
	var what_header_sernum = strPlanName + '-' + comCategory;
	var planStartTime_front = req.body.plan_StartTime;
	var planEndTime_front = req.body.plan_EndTime;
	var plan_manufacturedate_front = req.body.plan_ManufactureDate;

	// for console

	var planStartTime = JSON.stringify(req.body.plan_StartTime);
	var planEndTime = JSON.stringify(req.body.plan_EndTime);
	var plan_manufacturedate = JSON.stringify(req.body.plan_ManufactureDate);

	/*  在使用同一個地址連續發送交易時，每筆交易不可能立即到帳，當前交易還未到帳的情況下，下一筆交易無論是通過eth.getTransactionCount()獲取nonce值，
	    還是由節點自動從區塊中查詢，都會獲得和前一筆交易同樣的nonce值，這時節點就會錯誤 Error: replacement transaction underpriced */

	var rawTransacton = {
		"from": owner_address,
		"nonce": web3.toHex(web3.eth.getTransactionCount(owner_address)), //上面都是十六進位 use ( web3.toHex(count) = 0x2a = 42 ) repeated will nonce too low
		"gasPrice": web3.toHex(21000000000),
		"gasLimit": web3.toHex(2000000),
		"to": contract_address,
		"value": "0x0",
		"data": contract.NewPlan.getData(addrInitiater, strPlanName, planPrice)
	};

	var privateKey = Buffer.from(owner_private_key, "hex");
	var tx = new Tx(rawTransacton, {
		'chain': 'ropsten'
	});

	tx.sign(privateKey);
	var serializedTx = tx.serialize(); //把它序列化

	var pool = req.connection;
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM user_info WHERE user_address = ?', [addrInitiater], function(err, rows) {
			if (err) {
				res.render('error', {
					message: err.message,
					error: err
				});
			} else {
				web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) { //call back function 上面做完才會往下，等待時就不會進入
					if (!err) {
						console.log('newplan success');

						var tx_hash = hash;
						console.log(tx_hash);
						var cmd2 = "INSERT INTO plan_info(plan_name, plan_create_hash, plan_start, plan_end, plan_initiater_address, plan_price, plan_type, plan_howbreak, plan_status, plan_manufacturedate, plan_what_header_sernum, plan_totaljoiner, plan_repairjoiner) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
						connection.query(cmd2, [strPlanName, tx_hash, planStartTime_front, planEndTime_front, addrInitiater, planPrice, comCategory, howBreak, "on", plan_manufacturedate_front, what_header_sernum, 0, 0], function(err, rows) {

							if (err) {
								console.log('insert failed');

								return res.render('newplan/newplan_result', { //render的變數要前端有的
									hash: tx_hash,
									result: '插入資料庫失敗'
								});
							} else {
								console.log('insert success');
								return res.render('newplan/newplan_result', { //render的變數要前端有的
									hash: tx_hash,
									addr_Initiater: addrInitiater,
									
									plan_StartTime: planStartTime_front,
									plan_EndTime: planEndTime_front,
									plan_Price: planPrice,
									com_category: comCategory,
									how_break: howBreak,
									result: 'SUCCESS',
									plan_manufacturedate: plan_manufacturedate_front,
									what_header_sernum: what_header_sernum,
									session: req.session.user_id
								});
							}
						});

					} else {
						console.log(err);
						console.log("newplan fail");
					}
				});
			}
		})
		connection.release();
	})
});
module.exports = router;