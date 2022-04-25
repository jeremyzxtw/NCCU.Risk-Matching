var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction; //簽署合約 以下都是固定寫法
const testnet = 'https://ropsten.infura.io/v3/b4946971370c4cde80aa1dfaeb1989a0';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet)); //串以太坊
var contract_address = '0xaff5fb89c81f9b5566d49347e4880e3cf4a7e21c';
var contractABI = [{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"}],"name":"proxy_ActiveStrategy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"transferPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"sig","type":"bytes"}],"name":"recover","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getNonce","outputs":[{"name":"nonce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"}],"name":"proxy_inActiveStrategy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"approvePreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Initial_Supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"},{"name":"addrCopyTrader","type":"address"},{"name":"id","type":"uint256"},{"name":"endAmount","type":"uint256"}],"name":"proxy_endCommit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"decreaseApprovalPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"increaseApprovalPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signature","type":"bytes"},{"name":"_to","type":"address"},{"name":"_controlId","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"CopyMatch","type":"address"},{"name":"addrCopyTrader","type":"address"},{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"otherData","type":"string"},{"name":"endAmount","type":"uint256"}],"name":"controlPreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"CopyMatch","type":"address"},{"name":"addrCopyTrader","type":"address"},{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"otherData","type":"string"}],"name":"proxy_createCommit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_token","type":"address"},{"name":"_functionSig","type":"bytes4"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_fee","type":"uint256"},{"name":"_nonce","type":"uint256"}],"name":"recoverPreSignedHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"ControlPreSigned_Transfer_Fee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"delegate","type":"address"},{"indexed":false,"name":"_controlId","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"ControlPreSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"TransferPreSigned_Transfer_Fee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"delegate","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"TransferPreSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"delegate","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"ApprovalPreSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"existingOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"transferOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
var contract = web3.eth.contract(contractABI).at(contract_address);
var owner_private_key = '73f5a26ae2588f4478e99d48608cd87824a44dc6513bee917b055775329089ac';
var owner_address = '0x27556e0d5351236d1361D7A6524E65d83B2B629c';
router.get('/', function(req, res, next) {
	// use underwriting_serialnumber.pug
	if (!req.session.user_id) {
		res.redirect('/login/login');
	} else {
		res.render('joinplan/underwriting_transfer', {
			session: req.session.user_id
		});
	}
});
router.post('/', function(req, res) {
	var pool = req.connection;
	pool.getConnection(function(err, connection) {
		if (err) {
			res.render('error', {
				message: err.message,
				error: err
			});
		} else {
			connection.query('SELECT * FROM user_info WHERE user_id = ?', [req.session.user_id], function(err, rows1) {
				if (err) {
					res.render('error', {
						message: err.message,
						error: err
					});
				} else if (rows1[0] === undefined) {
					res.render('joinplan/underwriting_transfer', {
						result: '讀取帳號資訊失敗。',
						session: req.session.user_id
					});
				} else {
					var rawTransacton = {
						"from": owner_address,
						"nonce": web3.toHex(web3.eth.getTransactionCount(owner_address)), //上面都是十六進位 use ( web3.toHex(count) = 0x2a = 42 ) repeated will nonce too low web3.toHex(web3.eth.getTransactionCount(owner_address))
						"gasPrice": web3.toHex(21000000000),
						"gasLimit": web3.toHex(2000000),
						"to": contract_address,
						"value": "0x0",
						"data": contract.transfer.getData(rows1[0].user_address, 1 * Math.pow(10, 18))
					};
					var privateKey = Buffer.from(owner_private_key, "hex");
					var tx = new Tx(rawTransacton, {
						'chain': 'ropsten'
					});
					tx.sign(privateKey);
					var serializedTx = tx.serialize(); // 把它序列化
					web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) { // call back function 上面做完才會往下，等待時就不會進入
						if (!err) {
							console.log('transferToken success');
							res.render('joinplan/underwriting_transfer', {
								result: 'https://ropsten.etherscan.io/tx/' + hash,
								session: req.session.user_id
							});
						} else {
							res.render('joinplan/underwriting_transfer', {
								result: 'transferToken fail' + '\n' + err,
								session: req.session.user_id
							});
						}
					});
				}
			});
		}
		connection.release();
	});
});
module.exports = router;