var openchain = require("openchain");
var bitcore = require("bitcore-lib");
var Mnemonic = require('bitcore-mnemonic');

//TODO: Create a function to derive a walletId from private key.

//Create new Passphrase / new user
function createUser() {
var code = new Mnemonic();

//Load a private key from a seed
var privateKey = code.toHDPrivateKey();
var hdPrivateKey = new bitcore.HDPrivateKey(privateKey.toString());
hdPrivateKey.network = bitcore.Networks.get("openchain");
var derivedKey = hdPrivateKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);
console.log("Passphrase is: " + code.toString() + "\nWalletID: " + derivedKey.privateKey.toAddress().toString());

}

//Existing Account Query
//Asset path needs to be in full i.e. /asset/p2pkh/XcDCGPMtdrKxodQ4soFyYfDmr78gTvJ9jN/
function existingAccountQuery(passphrase, asset) {
    var client = new openchain.ApiClient("http://0.0.0.0:8080/");

    //Calculate Private Key and wallet path from passphrase.
    var tmpMnenoic = new Mnemonic(passphrase);
    var privateKey = tmpMnenoic.toHDPrivateKey();
    var hdPrivateKey = new bitcore.HDPrivateKey(privateKey.toString());
    hdPrivateKey.network = bitcore.Networks.get("openchain");
    
    var derivedKey = hdPrivateKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);
    var walletId = "/p2pkh/" + derivedKey.privateKey.toAddress().toString() + "/";

    client.getAccountRecord(walletId, asset)
    .then(function (result) {
        console.log("Account Balance: " + result.balance.toString());
    });
}

function testDoNotUse() {
// var acc2 = "license saddle depart vintage nurse promote renew suggest steak already flush avocado";
// var acc2Mne = new Mnemonic(acc2);
// // var secondPrivateKey = acc2Mne.toHDPrivateKey();
// // console.log(secondPrivateKey.);

// var t = new Mnemonic();
// var makeKey = acc2Mne.toHDPrivateKey() //I think u missed toHDprivatekey
// var hdPrivateKey = new bitcore.HDPrivateKey(makeKey.toString());
// hdPrivateKey.network = bitcore.Networks.get("openchain");
// derivedKey = hdPrivateKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);
// //Wallet Address is  "/p2pkh/"+derivedKey.privateKey.toAddress().toString()+"/";
// console.log(derivedKey.privateKey.toAddress().toString());
}

existingAccountQuery("deny depend label valid belt begin gesture extend list they outer glove", "/asset/p2pkh/XddsvA9fJurr4mEPggsLiM7BwkJjDtDi2o/");