App = {
	web3Provider: null,
	contracts: {},

	init: function() {
		console.log("App initialized...")
		return App.initWeb3();
	},

	initWeb3: function() {
		if (typeof web3 !== 'undefined') {
			// If a web3 instance is already provided by meta mask.
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		}   else {
		    // Specify default instance if no web3 instance provided
		    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
		    web3 = new Web3(App.web3Provider);
		}
	},

	initContracts: function() {
		$.getJSON("RiskxTokenSale.json", function(riskxTokenSale) {
			App.contracts.RiskxTokenSale = TruffleContract(riskxTokenSale);
		})
	}
}

$(function() {
	$(window).load(function() {
		App.init();
    })
});