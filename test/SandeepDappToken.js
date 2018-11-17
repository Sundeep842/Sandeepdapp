var SandeepDappToken = artifacts.require("./SandeepDappToken.sol");
 contract('SandeepDappToken',function(accounts){
 it('sets the total supp;y up on deployment',function() {
         return SandeepDappToken.deployed().then(function(instance){
		 tokenInstance =  instance;
		 return tokenInstance.totalSupply();
	 }).then(function(totalSupply){
		 assert.equal(totalSupply.toNumber(), 100000, 'sets the total')
	 });

 });
	 
 })
