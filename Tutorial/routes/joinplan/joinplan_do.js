var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction; //簽署合約 以下都是固定寫法
const testnet = 'https://ropsten.infura.io/v3/b4946971370c4cde80aa1dfaeb1989a0';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet)); //串以太坊
var contract_address = "0x762e62e43de6e2217cd15a48ec6d3dbfe8849a01";
var contractABI = [{
	"constant": false,
	"inputs": [{
		"name": "_strPlanName",
		"type": "string"
	}, {
		"name": "_addrInitiater",
		"type": "address"
	}],
	"name": "ActivePlan",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_strPlanName",
		"type": "string"
	}, {
		"name": "_addrInitiater",
		"type": "address"
	}],
	"name": "inActivePlan",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_addrJoiner",
		"type": "address"
	}, {
		"name": "_strPlanName",
		"type": "string"
	}, {
		"name": "_comName",
		"type": "string"
	}, {
		"name": "_comSerNum",
		"type": "string"
	}],
	"name": "JoinPlan",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_addrInitiater",
		"type": "address"
	}, {
		"name": "_strPlanName",
		"type": "string"
	}, {
		"name": "_planPrice",
		"type": "uint256"
	}],
	"name": "NewPlan",
	"outputs": [{
		"name": "",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "_addrInitiater",
		"type": "address"
	}, {
		"name": "_addrJoiner",
		"type": "address"
	}, {
		"name": "_numtime",
		"type": "uint256"
	}],
	"name": "Repair",
	"outputs": [{
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "constructor"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "addrInitiater",
		"type": "address"
	}, {
		"indexed": false,
		"name": "strPlanName",
		"type": "string"
	}, {
		"indexed": false,
		"name": "planPrice",
		"type": "uint256"
	}],
	"name": "eventNewPlan",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "strPlanName",
		"type": "string"
	}, {
		"indexed": false,
		"name": "addrInitiater",
		"type": "address"
	}],
	"name": "eventinActive",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "strPlanName",
		"type": "string"
	}, {
		"indexed": false,
		"name": "addrInitiater",
		"type": "address"
	}],
	"name": "eventActive",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "addrJoiner",
		"type": "address"
	}, {
		"indexed": false,
		"name": "strPlanName",
		"type": "string"
	}, {
		"indexed": false,
		"name": "comName",
		"type": "string"
	}, {
		"indexed": false,
		"name": "comSerNum",
		"type": "string"
	}],
	"name": "eventJoinPlan",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "addrJoiner",
		"type": "address"
	}, {
		"indexed": false,
		"name": "numtime",
		"type": "uint256"
	}],
	"name": "eventifUnderWriting",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "addrJoiner",
		"type": "address"
	}, {
		"indexed": false,
		"name": "numtime",
		"type": "uint256"
	}],
	"name": "eventRepair",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "addrJoiner",
		"type": "address"
	}],
	"name": "eventVerifysubject",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "addrInitiater",
		"type": "address"
	}, {
		"indexed": false,
		"name": "numtime",
		"type": "uint256"
	}],
	"name": "eventAccounting",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "owner",
		"type": "address"
	}],
	"name": "eventConstructor",
	"type": "event"
}, {
	"constant": true,
	"inputs": [{
		"name": "_addrInitiater",
		"type": "address"
	}, {
		"name": "_numtime",
		"type": "uint256"
	}],
	"name": "Accounting",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "_addrJoiner",
		"type": "address"
	}, {
		"name": "_numtime",
		"type": "uint256"
	}],
	"name": "ifUnderWriting",
	"outputs": [{
		"name": "",
		"type": "string"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "joiner",
	"outputs": [{
		"name": "addrJoiner",
		"type": "address"
	}, {
		"name": "planNameofJoiner",
		"type": "string"
	}, {
		"name": "comName",
		"type": "string"
	}, {
		"name": "comSerNum",
		"type": "string"
	}, {
		"name": "ifJoinSuc",
		"type": "bool"
	}, {
		"name": "ifRepairSuc",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "",
		"type": "address"
	}, {
		"name": "",
		"type": "uint256"
	}],
	"name": "JoinerInfo",
	"outputs": [{
		"name": "addrJoiner",
		"type": "address"
	}, {
		"name": "planNameofJoiner",
		"type": "string"
	}, {
		"name": "comName",
		"type": "string"
	}, {
		"name": "comSerNum",
		"type": "string"
	}, {
		"name": "ifJoinSuc",
		"type": "bool"
	}, {
		"name": "ifRepairSuc",
		"type": "bool"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "",
		"type": "address"
	}],
	"name": "NumOfTimeForAddress",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "plan",
	"outputs": [{
		"name": "strPlanName",
		"type": "string"
	}, {
		"name": "planStatus",
		"type": "bool"
	}, {
		"name": "planStartTime",
		"type": "uint256"
	}, {
		"name": "planEndTime",
		"type": "uint256"
	}, {
		"name": "numPeople",
		"type": "uint256"
	}, {
		"name": "numRepairedPeople",
		"type": "uint256"
	}, {
		"name": "planPrice",
		"type": "uint256"
	}, {
		"name": "addrInitiater",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "",
		"type": "address"
	}, {
		"name": "",
		"type": "uint256"
	}],
	"name": "PlanInfoForAddress",
	"outputs": [{
		"name": "strPlanName",
		"type": "string"
	}, {
		"name": "planStatus",
		"type": "bool"
	}, {
		"name": "planStartTime",
		"type": "uint256"
	}, {
		"name": "planEndTime",
		"type": "uint256"
	}, {
		"name": "numPeople",
		"type": "uint256"
	}, {
		"name": "numRepairedPeople",
		"type": "uint256"
	}, {
		"name": "planPrice",
		"type": "uint256"
	}, {
		"name": "addrInitiater",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}]
var contract = web3.eth.contract(contractABI).at(contract_address);
var owner_private_key = "73f5a26ae2588f4478e99d48608cd87824a44dc6513bee917b055775329089ac";
var owner_address = "0x27556e0d5351236d1361D7A6524E65d83B2B629c";
var count = web3.eth.getTransactionCount(owner_address);
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('joinplan/joinplan_do', {
		session: req.session.user_id,
	});
});
router.post('/', function(req, res) {
	console.log('選了第幾個商品:' + req.body.optradio1);
	console.log('選了第幾個方案:' + req.body.optradio2);
	var pool = req.connection;
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM com_info WHERE underwriting_id = ?', [req.session.user_id], function(err, rows1) {
			if (err) {
				res.render('error', {
					message: err.message,
					error: err
				});
			} else if (rows1[0] === undefined) {
				res.render('joinplan/joinplan_do', { //render的變數要前端有的
					result: '找不到此id核保的商品'
				});
			} else {
				console.log('此使用者選擇的商品序號為:' + rows1[req.body.optradio1 - 1].com_sernum);
				connection.query('SELECT * FROM plan_info WHERE plan_status = ?', ['on'], function(err, rows2) {
					if (err) {
						res.render('error', {
							message: err.message,
							error: err
						});
					} else if (rows2[0] === undefined) {
						return res.render('joinplan/joinplan_do', { //render的變數要前端有的
							result: '方案狀態有誤' //您輸入的產品序號與方案不相符，請再次檢查後重新加入
						});
					} else {
						var com = rows1[req.body.optradio1 - 1].com_type;
						var plan = rows2[req.body.optradio2 - 1].plan_type;
						console.log('比對兩個:' + com + plan);
						if (com != plan) {
							return res.render('joinplan/joinplan_do', { //render的變數要前端有的
								result: '您選擇的產品類型與方案不相符，請再次檢查後重新加入'
							});
						} else {
							connection.query('SELECT * FROM user_info WHERE user_id = ?', [req.session.user_id], function(err, rows3) {
								if (err) {
									res.render('error', {
										message: err.message,
										error: err
									});
								} else if (rows3[0] === undefined) {
									return res.render('joinplan/joinplan_do', { //render的變數要前端有的
										result: '使用者資料有誤'
									});
								} else {
									var rawTransacton = {
										"from": owner_address,
										"nonce": web3.toHex(web3.eth.getTransactionCount(owner_address)), //十六進位 web3.toHex(count) will Error: nonce too low, so use fixed num
										"gasPrice": web3.toHex(31000000000),
										"gasLimit": web3.toHex(2000000),
										"to": contract_address,
										"value": "0x0",
										"data": contract.JoinPlan.getData(rows3[0].user_address, 'default', rows2[req.body.optradio2 - 1].plan_type, rows1[req.body.optradio1 - 1].com_sernum)
									};
									var privateKey = Buffer.from(owner_private_key, "hex");
									var tx = new Tx(rawTransacton, {
										'chain': 'ropsten'
									});
									tx.sign(privateKey);
									var serializedTx = tx.serialize(); //把它序列化
									web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) { //call back function 上面做完才會往下，等待時就不會進入
										if (!err) {
											console.log('call eth joinplan success');
											console.log('hash為' + hash);
											var cmd = "INSERT INTO joiner_info(joiner_address, join_planname, com_type, com_sernum, join_hash) VALUES (?,?,?,?,?)";
											connection.query(cmd, [rows3[0].user_address, rows1[req.body.optradio1 - 1].com_company, rows2[req.body.optradio2 - 1].plan_type, rows1[req.body.optradio1 - 1].com_sernum, hash], function(err, rows4) {
												if (err) {
														res.render('joinplan/joinplan_do', { //render的變數要前端有的
														result: 'database insert failed' + err
													});
												} else {
													var header_sernum = rows1[req.body.optradio1 - 1].com_company + '-' + rows2[req.body.optradio2 - 1].plan_type;
													console.log('header_sernum:' + header_sernum)
													connection.query('SELECT * FROM plan_info WHERE plan_type = ?', [rows2[req.body.optradio2 - 1].plan_type], function(err, rows5) {
														if (err) {
																res.render('joinplan/joinplan_do', { //render的變數要前端有的
																result: 'database select failed' + '\n' + err
															});
														} else if (rows5[0] === undefined) {
																res.render('joinplan/joinplan_do', { //render的變數要前端有的
																result: 'undefined'
															});
														} else {
															console.log(parseInt(rows5[0].plan_totaljoiner), rows5[0].plan_totaljoiner);
															var head = 'default' + rows2[req.body.optradio2 - 1].plan_type;
															console.log(rows2[req.body.optradio2 - 1].plan_type);
															connection.query('UPDATE plan_info SET plan_totaljoiner = ? WHERE plan_type = ?', [parseInt(rows5[0].plan_totaljoiner) + 1, rows2[req.body.optradio2 - 1].plan_type], function(err, rows6) {
																if (err) {
																	return res.render('joinplan/joinplan_do', { //render的變數要前端有的
																		result: 'database update +1 failed' + '\n' + err,
																		session: req.session.user_id
																	});
																} else {
																	return res.render('joinplan/joinplan_do', { //render的變數要前端有的
																		succ_result: '加入成功 https://ropsten.etherscan.io/tx/' + hash,
																		session: req.session.user_id
																	});
																}
															});
														}
													});
												}
											});
										} else {
											return res.render('joinplan/joinplan_do', { //render的變數要前端有的
												result: 'call eth joinplan fail' + '\n' + err,
												session: req.session.user_id
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
		connection.release();
	});
});
module.exports = router;