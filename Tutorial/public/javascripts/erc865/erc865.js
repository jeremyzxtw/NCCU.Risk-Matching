'use strict';
window.addEventListener('load', async () => {
    // Modern dapp browsers...
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


    //var web3 = new Web3.providers.HttpProvider("http://18.188.174.52:7890");
    //web3.eth.defaultAccount = web3.eth.accounts[0];

    //console.log(contract);

    $("#fetch_metamask").click(function () {

        var tkn = $("#token_addr").val();
        var from = $("#from_addr").val();
        var to = $("#to_addr").val();
        var val = $("#token_value").val();
        var fee = $("#fee").val();
        var nonce;
        var transferSig = "0x48664c16";

        web3.eth.getAccounts(function (error, accounts) {
            contract.getNonce(accounts[0], function (error, nonce) {
                if (!error) {
                    web3.eth.getBalance(accounts[0], function (error, ethBalance) {
                        contract.balanceOf(accounts[0], function (error, tknBalance) {
                            contract.name(function (error, tknName) {
                                nonce = Number(nonce) + Number(1);
                                $("#token_addr").val(ContractAddress);
                                $("#from_addr").val(accounts[0]);
                                $("#nonce").val(nonce);
                                $("#eth_bal").val(ethBalance / 10 ** 18);
                                $("#tkn_name").val(tknName);
                                $("#tkn_bal").val(tknBalance / 10 ** 18);
                            });
                        });
                    });
                } else {
                    console.log(error);
                    $("#label_common").text(error);
                }
            });
        });
        return false;
    });

    $("#getTokens").click(function () {
        web3.eth.getAccounts(function (error, accounts) {
            contract.transferFromContract(function (error, txHash) {
                if (!error) {
                    console.log(txHash);
                    //$("#label_common").text("Transaction hash : " + txHash);
                    $("#txspan").show();
                    $("#linktx").text(txHash);
                    $("#linktx").attr('href', 'https://rinkeby.etherscan.io/tx/' + txHash);
                } else {
                    console.log(error);
                    $("#label_common").text(error);
                }
            });
        });
        return false;
    });

    $("#fetch_metamask1").click(function () {

        web3.eth.getAccounts(function (error, accounts) {
            contract.getNonce(accounts[0], function (error, nonce) {
                if (!error) {
                    web3.eth.getBalance(accounts[0], function (error, ethBalance) {
                        contract.balanceOf(accounts[0], function (error, tknBalance) {
                            contract.name(function (error, tknName) {
                                $("#from_addr1").val(accounts[0]);
                                $("#eth_bal1").val(ethBalance / 10 ** 18);
                                $("#tkn_name1").val(tknName);
                                $("#tkn_bal1").val(tknBalance / 10 ** 18);
                            });
                        });
                    });
                } else {
                    console.log(error);
                    $("#label_common").text(error);
                }
            });
        });
        return false;
    });

    $("#create_signature").click(function () {

        var tkn = $("#token_addr").val();
        var from = $("#from_addr").val();
        var to = $("#to_addr").val();
        var val = $("#token_value").val();
        val = val * (10 ** 18);
        var fee = $("#fee").val();
        fee = fee * (10 ** 18);
        var nonce = $("#nonce").val();
        var transferSig = "0x48664c16";

        web3.eth.getAccounts(function (error, accounts) {
            contract.recoverPreSignedHash(ContractAddress, transferSig, to, val, fee, nonce, function (error, hash) {
                if (!error) {
                    web3.eth.sign(accounts[0], hash, function (error, signature) {
                        if (!error) {
                            console.log(hash);
                            console.log(signature);
                            $("#label_common").text(signature);
                        } else {
                            console.log(error);
                            $("#label_common").text(error);
                        }
                    });
                } else {
                    console.log(error);
                    $("#label_common").text(error);
                }
            });
        });
        return false;
    });

    $("#query_tab").click(function () {

        var tkn = $("#token_addr").val();
        var from = $("#from_addr").val();
        var to = $("#to_addr").val();
        var val = $("#token_value").val();
        var fee = $("#fee").val();
        var nonce = $("#nonce").val();
        var transferSig = "0x48664c16";
        var sign = $("#label_common").text();
        var tml;
        $("#tbltbody").html("");

        if (tml == "") {
            tml = "<tr><td><input type='checkbox' name='vehicle1' value='Bike'></td><td>" + sign + "</td><td>" + tkn + "</td><td>" + from + "</td><td>" + to + "</td><td>" + val + "</td><td>" + fee + "</td><td>" + nonce + "</td></tr>";
        }
        else {
            tml = tml + "<tr><td><input type='checkbox' name='vehicle1' value='Bike'></td><td>" + sign + "</td><td>" + tkn + "</td><td>" + from + "</td><td>" + to + "</td><td>" + val + "</td><td>" + fee + "</td><td>" + nonce + "</td></tr>";
        }

        $("#tbltbody").html(tml);
        $("#dyn_tb").show();
    });

    $("#execSign").click(function () {

        var tkn = $("#token_addr").val();
        var from = $("#from_addr").val();
        var to = $("#to_addr").val();
        var val = $("#token_value").val();
        val = val * (10 ** 18);
        var fee = $("#fee").val();
        fee = fee * (10 ** 18);
        var nonce = $("#nonce").val();
        var transferSig = "0x48664c16";
        var sign = $("#label_common").text();

        web3.eth.getAccounts(function (error, accounts) {
            contract.transferPreSigned(sign, to, val, fee, nonce, function (error, txHash) {
                if (!error) {
                    console.log(txHash);
                    //$("#label_common").text("Transaction hash : " + txHash);
                    $("#txspan").show();
                    $("#linktx").text(txHash);
                    $("#linktx").attr('href', 'https://rinkeby.etherscan.io/tx/' + txHash);
                } else {
                    console.log(error);
                    $("#label_common").text(error);
                }
            });
        });
        return false;
    });
});