var SandeepDappTokenSale = artifacts.require("./SandeepDappTokenSale.sol");

contract('SandeepDappTokenSale', function(accounts) {
var tokenSaleInstance;

	it('Initialises the contract with correct values', function() {
	return SandeepDappTokenSale.deployed().then(function(instance){
		tokenSaleInstance = instance;
		return tokenSaleInstance.address;

	}).then(function(address) { 
		assert.notEqual(address,0x0,'has contract address');
	})
	
	});

});

