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
	it('transfers token ownership', function() {
		return SandeepDappToken.deployed().then(function(instance){
			tokenInstance = instance;
		
		return tokenInstance.transfer(accounts[1],999999999999999999);
		}).then(assert.fail).catch(function(error) {
			
			
			assert(error.message.indexOf('revert') >=  0, 'error message mustcontain revert');
		
		return tokenInstance.transfer(accounts[1], 25000, {from: accounts[0] });
		}).then(function(receipt) {
			assert.equal(receipt.logs.length, 1,'triggers one eventí');
			 assert.equal(receipt.logs[0].event,"Transfer", 'should be the transfer event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from ');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to ');
			assert.equal(receipt.logs[0].args._value, 25000, 'logs the account the tokens are transferred from ');
			
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 25000, 'adds the amount to receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 75000, 'deducts amount from sending amount');
		})
 });


	 it('approves token for delegated transfer', function(){

		 return SandeepDappToken.deployed().then(function(instance){
			 tokenInstance = instance;
			 return tokenInstance.approve.call(accounts[1], 100);
		 }).then(function(success){
				 assert.equal(success, true, 'it returns true');
			return tokenInstance.approve(accounts[1], 100)
 
	 	 }).then(function(receipt) {
			  assert.equal(receipt.logs.length, 1,'triggers one eventí');
                         assert.equal(receipt.logs[0].event,"Approval", 'should be the Approval  event');
                        assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by ');
                        assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to');
                        assert.equal(receipt.logs[0].args._value, 100, 'logs the amount ');
			 return tokenInstance.allowance(accounts[0], accounts[1]);

		}).then(function(allowance) {
			assert.equal(allowance.toNumber(), 100, 'stores allowance for delegated tranfer');	

 		});

	 })
	it('handles delegate function ', function(){
		return SandeepDappToken.deployed().then(function(instance){
			tokenInstance = instance;
			fromAccount =  accounts[2];
			toAccount = accounts[3];
			spendingAccount = accounts[4];
		return tokenInstance.transfer(fromAccount, 100,{from: accounts[0]});
		}).then(function(receipt){
			return tokenInstance.approve(spendingAccount, 10, {from: fromAccount});
		}).then(function(receipt) {
		return tokenInstance.transferFrom(fromAccount, toAccount, 999999, {from: spendingAccount});
		}).then(assert.fail).catch(function(error){
		assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than balance');
		return tokenInstance.transferFrom(fromAccount, toAccount, 20);
		}).then(assert.fail).catch(function(error){
                assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger than approved amount');
		 return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from: spendingAccount});
		}).then(function(success) {
		assert.equal(success, true,'success');
		
                 return tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount});
		}).then(function(receipt) {
                        assert.equal(receipt.logs.length, 1,'triggers one eventí');
                         assert.equal(receipt.logs[0].event,"Transfer", 'should be the transfer event');
                        assert.equal(receipt.logs[0].args._from, accounts[2], 'logs the account the tokens are transferred from ');
                        assert.equal(receipt.logs[0].args._to, accounts[3], 'logs the account the tokens are transferred to ');

		assert.equal(receipt.logs[0].args._value, 10, 'logs the account the tokens are transferred from ');
			return tokenInstance.balanceOf(fromAccount);
		}).then(function(balance) {
				assert.equal(balance.toNumber(), 90,'deducts amount');
		                        return tokenInstance.balanceOf(toAccount);
		}).then(function(balance) {
                                assert.equal(balance.toNumber(), 10,'adds amount');
                	return tokenInstance.allowance(fromAccount,spendingAccount);
		}).then(function(balance) {
			assert.equal(balance.toNumber(),0,'deducts amount from allowance');
		})


	})
});	
