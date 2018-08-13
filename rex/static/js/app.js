App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProviders('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON("RiskxTokenSale.json", function(RiskxTokenSale) {
      App.contracts.RiskxTokenSale = TruffleContract(RiskxTokenSale);
      App.contracts.RiskxTokenSale.setProvider(App.web3Provider);
      App.contracts.RiskxTokenSale.deployed().then(function(RiskxTokenSale) {
        console.log("Riskx Token Sale Address:", RiskxTokenSale.address); 
        // Try loading this App with the Truffle suite on the iMac
      });
    })
  }
}

$(function() {
  $(window).load(function() {
    App.init();
  })
});