// var openchain = require("openchain");

// var bitcore = require("bitcore-lib");

// // Load a private key from a seed
// var privateKey = bitcore.HDPrivateKey.fromSeed(seed, "openchain");
// var address = privateKey.publicKey.toAddress();

// // Create an Openchain client and signer
// var signer = new openchain.MutationSigner(privateKey);
// var client = new openchain.ApiClient("http://localhost:8080/");

// // Calculate the accounts corresponding to the private key
// var issuancePath = "/asset/p2pkh/" + address + "/";
// var assetPath = issuancePath;
// var walletPath = "/p2pkh/" + address + "/";

// var seed = "electric fluid mule proud weekend all brush loyal shell squeeze coast amateur";

// var mnemonic = new Mnemonic(seed);

// var privateKey = mnemonic.DeriveExtKey("electric fluid mule proud weekend all brush loyal shell squeeze coast amateur");

// var rootKey = privateKey.Derive(0);

// client.getAccountRecord(
//     // Account path
//     "/p2pkh/XqBXu7kB8Se5UskxQJcqBPQSz4Xd4nvywd/",
//     // Asset path
//     "/asset/p2pkh/XnAXeH5KSRbBYDy2XdEFEDtNi89fDxDZSG/")
// .then(function (result) {
//     console.log("Balance: " + result.balance.toString());
// });


// console.log("Issuance path: " + issuancePath);
// console.log("Wallet path: " + walletPath);


// // Initialize the client
// client.initialize()
// .then(function () {
//     // Create a new transaction builder
//     return new openchain.TransactionBuilder(client)
//         // Add the key to the transaction builder
//         .addSigningKey(signer)
//         // Add some metadata to the transaction
//         .setMetadata({ "memo": "Issued through NodeJS" })
//         // Take 100 units of the asset from the issuance path
//         .updateAccountRecord(issuancePath, assetPath, -100);
// })
// .then(function (transactionBuilder) {
//     // Add 100 units of the asset to the target wallet path
//     return transactionBuilder.updateAccountRecord(walletPath, assetPath, 100);
// })
// .then(function (transactionBuilder) {
//     // Submit the transaction
//     return transactionBuilder.submit();
// })
// .then(function (result) { console.log(result); });

var bitcore = require('bitcore');
var HDPrivateKey = bitcore.HDPrivateKey;

var hdPrivateKey = new HDPrivateKey();
var retrieved = new HDPrivateKey('xpriv...');
var derived = hdPrivateKey.derive("m/0'");
var derivedByNumber = hdPrivateKey.derive(1).derive(2, true);
var derivedByArgument = hdPrivateKey.derive("m/1/2'");
assert(derivedByNumber.xprivkey === derivedByArgument.xprivkey);

var address = derived.privateKey.toAddress();
// obtain HDPublicKey
var hdPublicKey = hdPrivateKey.hdPublicKey;
try {
  new HDPublicKey();
} catch(e) {
  console.log("Can't generate a public key without a private key");
}

var address = new Address(hdPublicKey.publicKey, Networks.livenet);
var derivedAddress = new Address(hdPublicKey.derive(100).publicKey, Networks.testnet);

var user_priv_key = address;
var user_hd_private_key = new bitcore.HDPrivateKey(user_priv_key);
var user_public_address = user_hd_private_key.publicKey.toAddress();

var dataPath = "/aka/user/";
var recordName = "acl";
var storedData = JSON.stringify([

{
    "subjects": [ { "addresses": [ ], "required": 0 } ],
    "permissions": { "account_modify": "Permit", "account_create": "Permit" } },
{
    "subjects": [ { "addresses": [ user_public_address.toString() ], "required": 1 } ], "permissions": { "account_spend": "Permit" }
}

]);


var client = new openchain.ApiClient("OPENCHAIN SERVER URL");
var signer = new openchain.MutationSigner();

// Initialize the client
client.initialize()
    .then(function () {
        // Retrieve the record being modified
        return client.getDataRecord(dataPath, recordName)
    })
    .then(function (dataRecord) {
        // Encode the data into a ByteBuffer
        var newValue = openchain.encoding.encodeString(storedData);

        // Create a new transaction builder
        return new openchain.TransactionBuilder(client)
        // Add the key to the transaction builder
            .addSigningKey(signer)
            // Modify the record
            .addRecord(dataRecord.key, newValue, dataRecord.version)
            // Submit the transaction
            .submit();
    })
    .then(function (result) { console.log(result); });




