var SandeepDappToken = artifacts.require("./SandeepDappToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SandeepDappToken);
};

