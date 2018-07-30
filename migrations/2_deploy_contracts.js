var RiskxToken = artifacts.require("./RiskxToken.sol");
var RiskxTokenSale = artifacts.require("./RiskxTokenSale.sol");

module.exports = function(deployer) {
    deployer.deploy(RiskxToken, 600000000).then(function() {
    	// Token price is 0.00015 Ether or 0.070 USD
    	var tokenPrice = 60000000000000; 
  		return deployer.deploy(RiskxTokenSale, RiskxToken.address, tokenPrice); 
  	});
};
