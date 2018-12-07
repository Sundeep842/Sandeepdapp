var SandeepDappToken = artifacts.require("./SandeepDappToken.sol");
 contract('SandeepDappToken',function(accounts){
 	var tokenInstance;



	 it('sets the total supp;y up on deployment',function() {
         return SandeepDappToken.deployed().then(function(instance){
		 tokenInstance =  instance;
		 return tokenInstance.totalSupply();
	 }).then(function(totalSupply){
		 assert.equal(totalSupply.toNumber(), 100000, 'sets the total');
		return tokenInstance.balanceOf(accounts[0]);
	 }).then(function(adminBalance){
		 assert.equal(adminBalance.toNumber(), 100000, 'it allocates initial supply to admin account');

	 }).then(function(name) {
		 return tokenInstance.name();
 });


        });


	it('transfers token ownership',function() {
		return SandeepDappToken.deployed().then(function(instance){
			tokenInstance = instance;
		
		return tokenInstance.transfer.call(accounts[1],999999999999999999);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'error message mustcontain revert');
		})
			



	})
 });
