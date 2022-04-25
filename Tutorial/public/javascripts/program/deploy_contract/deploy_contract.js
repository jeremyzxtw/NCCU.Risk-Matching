'use strict';
window.onload = date();
function date() {
    var now = new Date();
    var yyyy = now.getFullYear() + '';
    var MM = now.getMonth() + 1;
    var dd = now.getDate();
    var HH = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    if (MM < 10) MM = '0' + MM;
    if (dd < 10) dd = '0' + dd;
    if (HH < 10) HH = '0' + HH;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;
    var str = '';
    str = yyyy + '/' + MM + '/' + dd + ' ' + HH + ':' + mm + ':' + ss;
    document.getElementById('date').value = str;
}
window.addEventListener('load', async () => {

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
        } catch (error) {
            console.log(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }


    $("#create_signature").click(function () {
        document.getElementById('comfirm').disabled = false;
        var to = $("#to_address").val();
        var val = $("#value").val();
        val = val * Math.pow(10, 18);
        var fee = $("#fee").val();
        fee = fee * Math.pow(10, 18);
        var nonce = $("#nonce").val();
        var transferSig = $("#transfersig").val();

        web3.eth.getAccounts(function (error, accounts) {
            contract.recoverPreSignedHash(ContractAddress, transferSig, to, val, fee, nonce, function (error, hash) {
                if (!error) {
                    web3.eth.sign(accounts[0], hash, function (error, signature) {
                        if (!error) {
                            console.log(hash);
                            console.log(signature);
                            $("#signature").val(signature);
                        } else {
                            console.log(error);
                            $("#signature").val(error);
                        }
                    });
                } else {
                    console.log(error);
                }
            });
        });
        return false;
    });

});