var SandeepDappToken = artifacts.require("./SandeepDappToken.sol");
var SandeepDappTokenSale  = artifacts.require("./SandeepDappTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(SandeepDappToken, 100000);
deployer.deploy(SandeepDappTokenSale);	
};

