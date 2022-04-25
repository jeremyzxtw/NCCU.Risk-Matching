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


    $("#deposit").click(function () {
        
        var address_to = '0x9B292EDfac1A8d408aC7482A961578536354eecB';
        val = 1000 * Math.pow(10, 18);

        web3.eth.getAccounts(function (error, accounts) {
            contract.transfer(address_to, val, function (error, hash) {
                if (!error) {
                    console.log(hash);
                            
                        
                    
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