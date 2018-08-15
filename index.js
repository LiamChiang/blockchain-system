var openchain = require("openchain");
var bitcore = require("bitcore-lib");
var Mnemonic = require('bitcore-mnemonic');

//Create new Passphrase = new wallet
// var code = new Mnemonic();
// console.log(code.toString());

// // Load a private key from a seed
// var privateKey = code.toHDPrivateKey();
// var hdPrivateKey = new bitcore.HDPrivateKey(privateKey);
// hdPrivateKey.network = bitcore.Networks.get("openchain");
// var derivedKey = hdPrivateKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);

// // Calculate the accounts corresponding to the private key
// var walletPath = "/p2pkh/" + derivedKey + "/";

// console.log("Wallet path: " + walletPath);


//Existing Account
// console.log("\nExisting");
// var passphrase = "finish list orient tomorrow fit fine midnight satisfy cover antique creek tank";
// var toMnenonic = new Mnemonic(passphrase);
// var privateKey2 = toMnenonic.toHDPrivateKey();
// console.log(privateKey2);

// var address2 = hdPrivateKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);
// var tmp = address2.privateKey.toAddress().toString();

// console.log(tmp);
// // Calculate the accounts corresponding to the private key
// var issuancePath2 = "/asset/p2pkh/" + address2 + "/";
// var assetPath2 = issuancePath2;
// var walletPath2 = "/p2pkh/" + address2 + "/";

// console.log("Issuance path: " + issuancePath2);
// console.log("Wallet path: " + walletPath2);

var acc2 = "license saddle depart vintage nurse promote renew suggest steak already flush avocado";
var acc2Mne = new Mnemonic(acc2);
// var secondPrivateKey = acc2Mne.toHDPrivateKey();
// console.log(secondPrivateKey.);

var t = new Mnemonic();
var makeKey = acc2Mne.toHDPrivateKey() //I think u missed toHDprivatekey
var hdPrivateKey = new bitcore.HDPrivateKey(makeKey.toString());
hdPrivateKey.network = bitcore.Networks.get("openchain");
derivedKey = hdPrivateKey.derive(44, true).derive(64, true).derive(0, true).derive(0).derive(0);
//Wallet Address is  "/p2pkh/"+derivedKey.privateKey.toAddress().toString()+"/";
console.log(derivedKey.privateKey.toAddress().toString());