var accounts;
var account;
var splitinst = split.deployed();
var contAddress;
var accA = "0x4d4d5660e9fa9606d4eb2b436c759e45ee17806d";
var accB = "0x2768c285ba729060992da50b3567c9175712f1b9";

window.onload = function() {
  var splitowner;
  var owner_bal_eth;
  var contBalance;


  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
  console.log("account: " + account);
});
//Owner Address
  splitinst.returnowner.call({from: account}).then (function (sowner) {
    var account_addr = document.getElementById("own_addr");
    account_addr.innerHTML = sowner.valueOf();
    splitowner = sowner.valueOf();
    console.log("SplitOwner Inside: " + splitowner);
//Owner Balance
    web3.eth.getBalance(splitowner,function(err, owner_bal){
      if (err != null) {
        alert("There was an error fetching your balance.");
        return;
      }
      console.log("balance: " + owner_bal);
      var bal = web3.fromWei(owner_bal,"ether")
      console.log("balance eth: " + bal);
      var account_bal = document.getElementById("own_balance");
      account_bal.innerHTML = bal;
    });
//Owner Balance
  }).catch(function(e) {
    console.log(e);
  }
);
//Owner Address

//Contract Address
  contAddress = splitinst.address;
  console.log("contAddress :" + contAddress);
  var contAddressHTML = document.getElementById("cont_addr");
  contAddressHTML.innerHTML = contAddress;
//Contract Address

//Contract Balance
  web3.eth.getBalance(contAddress,function(err,value){
    if (err != null) {
      alert ("There was an error fetching contract Balance");
    } else {
      console.log("contBalance : " + value);
      var bal = web3.fromWei(value,"ether")
      var contBalanceHTML = document.getElementById("cont_balance");
      contBalanceHTML.innerHTML = bal;
    }
  });
//Contract Balance

//accouunt A Address
var account_a_addr = document.getElementById("acc_a");
account_a_addr.innerHTML = accA;
//accouunt A Address
//accouunt B Address
var account_b_addr = document.getElementById("acc_b");
account_b_addr.innerHTML = accB;
//accouunt B Address
}




function sendEther() {
  var etherValue = 1000000000000000000;
  //Send Ether to Contract
  web3.eth.sendTransaction({from:account,to: contAddress, value: etherValue}, function (err, value1) {
   if (err != null) {
     alert ("There was an error fetching contract Balance in Send Ether");
     console.log("Send Ether error: " + err);
   } else {
     splitinst.sendEther(etherValue, {from: account}).then(function () {
       console.log("success splitting ether");
     }).catch(function(e){
       console.log("error splitting " + e);
     });
  //Send Ether to Contract
}
});
}


function refreshAccBal() {
  //Account A Balance
    web3.eth.getBalance(accA,function(err,value){
      if (err != null) {
        alert ("There was an error fetching Acc A Balance");
      } else {
        console.log("Acc A Balance : " + value);
        var bal = web3.fromWei(value,"ether")
        var contBalanceHTML = document.getElementById("acc_a_bal");
        contBalanceHTML.innerHTML = bal;
      }
    });
  //Account A Balance
  //Account b Balance
    web3.eth.getBalance(accB,function(err,value){
      if (err != null) {
        alert ("There was an error fetching Acc B Balance");
      } else {
        console.log("Acc B Balance : " + value);
        var bal = web3.fromWei(value,"ether")
        var contBalanceHTML = document.getElementById("acc_b_bal");
        contBalanceHTML.innerHTML = bal;
      }
    });
  //Account A Balance

}
