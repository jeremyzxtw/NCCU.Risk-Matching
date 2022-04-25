
var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction; //簽署合約 以下都是固定寫法
const testnet = 'https://ropsten.infura.io/v3/b4946971370c4cde80aa1dfaeb1989a0';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet)); //串以太坊


var contract_address = "0x7a7fb33c23cb7b5de73e198e42e62b4ecf366259";
var contractABI = [{ "constant": false, "inputs": [{ "name": "_addrInitiater", "type": "address" }, { "name": "_strPlanName", "type": "string" }, { "name": "_planPrice", "type": "uint256" }], "name": "NewPlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "plan", "outputs": [{ "name": "strPlanName", "type": "string" }, { "name": "planStatus", "type": "bool" }, { "name": "planStartTime", "type": "uint256" }, { "name": "planEndTime", "type": "uint256" }, { "name": "numPeople", "type": "uint256" }, { "name": "planPrice", "type": "uint256" }, { "name": "addrInitiater", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addrJoiner", "type": "address" }, { "name": "_numtime", "type": "uint256" }], "name": "ifUnderWriting", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "joiner", "outputs": [{ "name": "addrJoiner", "type": "address" }, { "name": "planNameofJoiner", "type": "string" }, { "name": "comName", "type": "string" }, { "name": "comSerNum", "type": "string" }, { "name": "ifJoinSuc", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_strPlanName", "type": "string" }, { "name": "_addrInitiater", "type": "address" }], "name": "ActivePlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "JoinerInfo", "outputs": [{ "name": "addrJoiner", "type": "address" }, { "name": "planNameofJoiner", "type": "string" }, { "name": "comName", "type": "string" }, { "name": "comSerNum", "type": "string" }, { "name": "ifJoinSuc", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_strPlanName", "type": "string" }, { "name": "_addrInitiater", "type": "address" }], "name": "inActivePlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "NumOfTimeForAddress", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_strPlanName", "type": "string" }], "name": "Balance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "PlanInfoForAddress", "outputs": [{ "name": "strPlanName", "type": "string" }, { "name": "planStatus", "type": "bool" }, { "name": "planStartTime", "type": "uint256" }, { "name": "planEndTime", "type": "uint256" }, { "name": "numPeople", "type": "uint256" }, { "name": "planPrice", "type": "uint256" }, { "name": "addrInitiater", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addrJoiner", "type": "address" }, { "name": "_strPlanName", "type": "string" }, { "name": "_comName", "type": "string" }, { "name": "_comSerNum", "type": "string" }], "name": "JoinPlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrInitiater", "type": "address" }, { "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "planPrice", "type": "uint256" }], "name": "eventNewPlan", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "addrInitiater", "type": "address" }], "name": "eventinActive", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "addrInitiater", "type": "address" }], "name": "eventActive", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrJoiner", "type": "address" }, { "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "comName", "type": "string" }, { "indexed": false, "name": "comSerNum", "type": "string" }], "name": "eventJoinPlan", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrJoiner", "type": "address" }], "name": "eventifUnderWriting", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrJoiner", "type": "address" }], "name": "eventVerifysubject", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "addrInitiater", "type": "address" }], "name": "eventBalance", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "owner", "type": "address" }], "name": "eventConstructor", "type": "event" }]
var contract = web3.eth.contract(contractABI).at(contract_address);


var owner_private_key = "73f5a26ae2588f4478e99d48608cd87824a44dc6513bee917b055775329089ac";
var addr_owner = "0x27556e0d5351236d1361D7A6524E65d83B2B629c";
var count = web3.eth.getTransactionCount(addr_owner);


router.get('/', function (req, res, next) {

    var addrJoiner = req.body.addr_Joiner;
    var strPlanName = req.body.str_PlanName;
    var comName = req.body.com_Name;
    var comSerNum = req.body.com_SerNum;

    if (!req.session.user_id) {
        res.redirect('/login/login');
    }
    else {
        res.render('joinplan', {

            addr_Joiner: addrJoiner,
            str_PlanName: strPlanName,
            com_Name: comName,
            com_SerNum: comSerNum
        });

    }

});

router.post('/', function (req, res) {


    var addrJoiner = req.body.addr_Joiner;
    var strPlanName = req.body.str_PlanName;
    var comBuyDate = req.body.com_BuyDate;
    var comPrice = req.body.com_Price;
    var comName = req.body.com_Name;
    var comSerNum = req.body.com_SerNum;

    var rawTransacton = {
        "from": addr_owner,
        "nonce": web3.toHex(count), //上面都是十六進位
        "gasPrice": web3.toHex(21000000000),
        "gasLimit": web3.toHex(2000000),
        "to": contract_address,
        "value": "0x0",
        "data": contract.JoinPlan.getData(addrJoiner, strPlanName, comName, comSerNum)
    };

    var privateKey = Buffer.from(owner_private_key, "hex");
    var tx = new Tx(rawTransacton, { 'chain': 'ropsten' });

    tx.sign(privateKey);
    var serializedTx = tx.serialize();//把它序列化


    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM user_info WHERE user_address = ?', [addrJoiner], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) { //call back function 上面做完才會往下，等待時就不會進入
                    if (!err) {
                        console.log('joinplan success');
                        var tx_hash = hash;
                        console.log(tx_hash);
                        var cmd2 = "INSERT INTO joiner_info(joiner_address, join_planname, com_buydate, com_price, com_name, com_sernum, join_hash, com_insurability) VALUES (?,?,?,?,?,?,?,?)";
                        connection.query(cmd2, [addrJoiner, strPlanName, comBuyDate, comPrice, comName, comSerNum, tx_hash, 'Yes'], function (err, rows) {

                            if (err) {
                                console.log('insert failed');
                            } else {
                                console.log('insert success');
                                return res.render('certificate/certificate', { //render的變數要前端有的
                                    hash: tx_hash,                                 
                                    str_PlanName: strPlanName,
                                    com_Name: comName,
                                    com_SerNum: comSerNum
                                });
                            }
                        });

                    }
                    else {
                        console.log(err);
                        console.log("joinplan fail");
                    }
                });
            }
        })
        connection.release();
    })
});


module.exports = router;
