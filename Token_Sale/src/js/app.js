App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPirce: 60000000000000, 
  tokensSold: 0,
  tokensAvailable: 450000000,

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
        console.log("Riskx Token Sale Address: ", riskxTokenSale.address);
      });
    }).done(function() {
      $.getJSON("RiskxToken.json", function(riskxToken) {
        App.contracts.RiskxToken = TruffleContract(riskxToken);
        App.contracts.RiskxToken.setProvider(App.web3Provider);
        App.contracts.RiskxToken.deployed().then(function(riskxToken) {
          console.log("Riskx Token Address: ", riskxToken.address);
        });
        
        App.listenForEvents();
        return App.render();
      });
    })
  },


  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.RiskxTokenSale.deployed().then(function(instance) {
      instance.Sell({}, {
        fromBlock: 0,
        toBlock: 'latest',
      }).watch(function(error, event) {
        console.log("event triggered", event);
        App.render();
      })
    })
  },

  render: function() {
    if (App.loading) {
      return;
    }
    App.loading = true;

    var loader  = $('#loader');
    var content = $('#content');

    loader.show();
    content.hide();

    // load account data
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        console.log("account", account);
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
    })
    // Load Token Sale Contract
    App.contracts.RiskxTokenSale.deployed().then(function(instance) {
      riskxTokenSaleInstance = instance;
      return riskxTokenSaleInstance.tokenPrice();
    }).then(function(tokenPrice) {
      console.log("tokenPrice", tokenPrice)
      App.tokenPrice = tokenPrice;
      $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
      return riskxTokenSaleInstance.tokensSold();
    }).then(function(tokensSold) {
      App.tokensSold = tokensSold.toNumber();
      $('.tokens-sold').html(App.tokensSold);
      $('.tokens-available').html(App.tokensAvailable);

      var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
      $('#skill_level').css('width', progressPercent + '%');

       // Load Token Contract
       App.contracts.RiskxToken.deployed().then(function(instance) {
        riskxTokenInstance = instance;
        return riskxTokenInstance.balanceOf(App.account);
      }).then(function(balance) {
        $('.riskx-balance').html(balance.toNumber());
        App.loading = false;
        loader.hide();
        content.show(); 
      })
    });
  },

  buyTokens: function() {
    $('#content').hide();
    $('#loader').show();
    var numberOfTokens = $('#numberOfTokens').val();
    App.contracts.RiskxTokenSale.deployed().then(function(instance) {
      return instance.buyTokens(numberOfTokens, {
        from: App.account, 
        value: numberOfTokens * App.tokenPrice,
        gas: 500000
      });
    }).then(function(result) {
      console.log("Tokens Bought...")
      $('form').trigger('reset') // reset number of tokens in form
      // Wait for sell event    
    });
  }
}

$(function() {
  $(window).load(function() {
    App.init();
  })
});