var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./RiskxToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};