var express = require('express');
var router = express.Router();

var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction; //ñ�p�X�� �H�U���O�T�w�g�k
const testnet = 'https://ropsten.infura.io/v3/b4946971370c4cde80aa1dfaeb1989a0';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet)); //��H�ӧ{


var contract_address = "0x7a7fb33c23cb7b5de73e198e42e62b4ecf366259";
var contractABI = [{ "constant": false, "inputs": [{ "name": "_addrInitiater", "type": "address" }, { "name": "_strPlanName", "type": "string" }, { "name": "_planPrice", "type": "uint256" }], "name": "NewPlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "plan", "outputs": [{ "name": "strPlanName", "type": "string" }, { "name": "planStatus", "type": "bool" }, { "name": "planStartTime", "type": "uint256" }, { "name": "planEndTime", "type": "uint256" }, { "name": "numPeople", "type": "uint256" }, { "name": "planPrice", "type": "uint256" }, { "name": "addrInitiater", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addrJoiner", "type": "address" }, { "name": "_numtime", "type": "uint256" }], "name": "ifUnderWriting", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "joiner", "outputs": [{ "name": "addrJoiner", "type": "address" }, { "name": "planNameofJoiner", "type": "string" }, { "name": "comName", "type": "string" }, { "name": "comSerNum", "type": "string" }, { "name": "ifJoinSuc", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_strPlanName", "type": "string" }, { "name": "_addrInitiater", "type": "address" }], "name": "ActivePlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "JoinerInfo", "outputs": [{ "name": "addrJoiner", "type": "address" }, { "name": "planNameofJoiner", "type": "string" }, { "name": "comName", "type": "string" }, { "name": "comSerNum", "type": "string" }, { "name": "ifJoinSuc", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_strPlanName", "type": "string" }, { "name": "_addrInitiater", "type": "address" }], "name": "inActivePlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "NumOfTimeForAddress", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_strPlanName", "type": "string" }], "name": "Balance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "uint256" }], "name": "PlanInfoForAddress", "outputs": [{ "name": "strPlanName", "type": "string" }, { "name": "planStatus", "type": "bool" }, { "name": "planStartTime", "type": "uint256" }, { "name": "planEndTime", "type": "uint256" }, { "name": "numPeople", "type": "uint256" }, { "name": "planPrice", "type": "uint256" }, { "name": "addrInitiater", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addrJoiner", "type": "address" }, { "name": "_strPlanName", "type": "string" }, { "name": "_comName", "type": "string" }, { "name": "_comSerNum", "type": "string" }], "name": "JoinPlan", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrInitiater", "type": "address" }, { "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "planPrice", "type": "uint256" }], "name": "eventNewPlan", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "addrInitiater", "type": "address" }], "name": "eventinActive", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "addrInitiater", "type": "address" }], "name": "eventActive", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrJoiner", "type": "address" }, { "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "comName", "type": "string" }, { "indexed": false, "name": "comSerNum", "type": "string" }], "name": "eventJoinPlan", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrJoiner", "type": "address" }], "name": "eventifUnderWriting", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addrJoiner", "type": "address" }], "name": "eventVerifysubject", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "strPlanName", "type": "string" }, { "indexed": false, "name": "addrInitiater", "type": "address" }], "name": "eventBalance", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "owner", "type": "address" }], "name": "eventConstructor", "type": "event" }]
var contract = web3.eth.contract(contractABI).at(contract_address);


var owner_private_key = "73f5a26ae2588f4478e99d48608cd87824a44dc6513bee917b055775329089ac";
var addr_owner = "0x27556e0d5351236d1361D7A6524E65d83B2B629c";
var count = web3.eth.getTransactionCount(addr_owner);


router.get('/', function (req, res, next) {

    var addrInitiater = req.body.address_Initiater;
    var strPlanName = req.body.plan_name;
    var planEndTime = JSON.stringify(req.body.plan_endtime);

    if (!req.session.user_id) {
        res.redirect('/login/login');
    }
    else {
        res.render('newplan', { //render���ܼƭn�e�ݦ���
            addr_Initiater: addrInitiater,
            str_PlanName: strPlanName,
            plan_EndTime: planEndTime
        });
    }

    
});

router.post('/', function (req, res) {

    var addrInitiater = req.body.addr_Initiater;
    var strPlanName = req.body.str_PlanName;

    var planStartTime = JSON.stringify(req.body.plan_StartTime);
    

    var planEndTime = JSON.stringify(req.body.plan_EndTime);
    var planPrice = req.body.plan_Price;

    var comCategory = req.body.com_category;
    var howBreak = req.body.how_break;

    console.log(planStartTime)
    console.log(comCategory)
    console.log(howBreak)



    var rawTransacton = {
        "from": addr_owner,
        "nonce": web3.toHex(count), //�W�����O�Q���i��
        "gasPrice": web3.toHex(21000000000),
        "gasLimit": web3.toHex(2000000),
        "to": contract_address,
        "value": "0x0",
        "data": contract.NewPlan.getData(addrInitiater, strPlanName, planPrice)
    };

    var privateKey = Buffer.from(owner_private_key, "hex");
    var tx = new Tx(rawTransacton, { 'chain': 'ropsten' });

    tx.sign(privateKey);
    var serializedTx = tx.serialize();//�⥦�ǦC��



    var pool = req.connection;
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM user_info WHERE user_address = ?', [addrInitiater], function (err, rows) {
            if (err) {
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }
            else {
                web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) { //call back function �W�������~�|���U�A���ݮɴN���|�i�J
                    if (!err) {
                        console.log('newplan success');
                        var tx_hash = hash;
                        console.log(tx_hash);
                        var cmd2 = "INSERT INTO plan_info(plan_name, plan_create_hash, plan_start, plan_end, plan_initiater_address, plan_price, plan_type, plan_howbreak) VALUES (?,?,?,?,?,?,?,?)";
                        connection.query(cmd2, [strPlanName, tx_hash, req.body.plan_StartTime, req.body.plan_EndTime, addrInitiater, planPrice, comCategory, howBreak], function (err, rows) {

                            if (err) {
                                console.log('insert failed');
                            } else {
                                console.log('insert success');
                                return res.render('newplan', { //render���ܼƭn�e�ݦ���
                                    hash: tx_hash,
                                    addr_Initiater: addrInitiater,
                                    str_PlanName: strPlanName,
                                    plan_StartTime: planStartTime,
                                    plan_EndTime: planEndTime,
                                    plan_Price: planPrice,
                                    com_category: comCategory,
                                    how_break: howBreak
                                });
                            }
                        });

                    }
                    else {
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