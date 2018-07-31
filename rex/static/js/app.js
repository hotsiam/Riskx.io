App = {
	web3Provider: null,
	contracts: {},
	account: '0x0', 

	init: function() {
		console.log("App initialized...")
		return App.initWeb3();
	},

	initWeb3: function() {
	    if (typeof web3 !== 'undefined') {
			// If a web3 instance is already provided by Meta Mask.
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
	    } else {
			// Specify default instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
			web3 = new Web3(App.web3Provider);
	    }
	    return App.initContracts();
	},

	initContracts: function() {
		$.getJSON("RiskxTokenSale.json", function(riskxTokenSale) {
			App.contracts.RiskxTokenSale = TruffleContract(riskxTokenSale);
			App.contracts.RiskxTokenSale.setProvider(App.web3Provider);
			App.contracts.RiskxTokenSale.deployed().then(function(riskxTokenSale) {
				console.log("Riskx Token Sale Address:", riskxTokenSale.address);
			});
		}).done(function() {
			$.getJSON("RiskxToken.json", function(riskxToken) {
				App.contracts.RiskxToken = TruffleContract(riskxToken);
				App.contracts.RiskxToken.setProvider(App.web3Provider);
				App.contracts.RiskxToken.deployed().then(function(riskxToken) {
					console.log("Riskx Token Address:", riskxToken.address);
				});
				return App.render();
			});
		})
	},

	render: function() {
		// Load account data
		web3.eth.getCoinbase(function(err, account) {
		    if(err === null) {
		        App.account = account;
		        $('#accountAddress').html("Your Account: " + account);
		    }
		})
	}
}
$(function() {
	$(window).load(function() {
		App.init();
  	})
})