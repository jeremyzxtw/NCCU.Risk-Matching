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


    $("#insure_token1").click(function () {

        
        var address_to = '0x27556e0d5351236d1361D7A6524E65d83B2B629c'; // owner

        if ($("#Insured_ID1").val() == 'joiner1') {
            address_to = '0xd00daFCAeee2d38dCdd6ACEce3981052B39fb79f'
        }
        else if ($("#Insured_ID1").val() == 'joiner2') {
            address_to = '0x215a210E4fB7E5ae396b33462C404a68bEAc1855'
        }
        else if ($("#Insured_ID1").val() == 'joiner3') {
            address_to = '0x1B71336028F039172425c4ecd3Ac0DD41B457366'
        }
        else if ($("#Insured_ID1").val() == 'joiner4') {
            address_to = '0x03834Fe94FC91CB5aE5690165bC7Ec2E81412E8A'
        }
        else if ($("#Insured_ID1").val() == 'joiner5') {
            address_to = '0x0C70b5Da1BB2aC417F0073bcd53E79222A7aA763'
        }
        else if ($("#Insured_ID1").val() == 'joiner6') {
            address_to = '0xb0bdDa6942a51E9C3B63550B71a730f33ee0DC57'
        }
        
        console.log(address_to);

        var val = $("#Insured_Token1").val()
        val = val * Math.pow(10, 18);

        web3.eth.getAccounts(function (error, accounts) {
            contract.transfer(address_to, val, function (error, hash) {
                if (!error) {
                    $("#hash").val(hash);
                } 
                else {
                    console.log(error);
                }
            });
        });
        return false;
    });

    $("#insure_token2").click(function () {

        
        var address_to = '0x27556e0d5351236d1361D7A6524E65d83B2B629c'; // owner

        if ($("#Insured_ID2").val() == 'joiner1') {
            address_to = '0xd00daFCAeee2d38dCdd6ACEce3981052B39fb79f'
        }
        else if ($("#Insured_ID2").val() == 'joiner2') {
            address_to = '0x215a210E4fB7E5ae396b33462C404a68bEAc1855'
        }
        else if ($("#Insured_ID2").val() == 'joiner3') {
            address_to = '0x1B71336028F039172425c4ecd3Ac0DD41B457366'
        }
        else if ($("#Insured_ID2").val() == 'joiner4') {
            address_to = '0x03834Fe94FC91CB5aE5690165bC7Ec2E81412E8A'
        }
        else if ($("#Insured_ID2").val() == 'joiner5') {
            address_to = '0x0C70b5Da1BB2aC417F0073bcd53E79222A7aA763'
        }
        else if ($("#Insured_ID2").val() == 'joiner6') {
            address_to = '0xb0bdDa6942a51E9C3B63550B71a730f33ee0DC57'
        }
        
        console.log(address_to);

        var val = $("#Insured_Token2").val()
        val = val * Math.pow(10, 18);

        web3.eth.getAccounts(function (error, accounts) {
            contract.transfer(address_to, val, function (error, hash) {
                if (!error) {
                    $("#hash").val(hash);
                } 
                else {
                    console.log(error);
                }
            });
        });
        return false;
    });
    
    
    /*$(document).ready(function()
    {
        contract.methods.balanceOf().call().then(function(bal)
        {
            $('#balance').html(bal);
        });
    });

    $('#deposit').click(function()
    {
        var amt = 0;
        amt = parseInt($('#amount').val());

        web3.eth.getAccounts().then(function(accounts)
        {
            var acc = accounts[0];
            return contract.methods.balanceOf(amt).call().then(function(bal){$('#balance').html(bal);});
        });
        
        
    });*/

});