var openchain = require("openchain");
var bitcore = require("bitcore-lib");

// var seed = "0123456789abcdef0123456789abcdef";
var bip39 = require('bip39');
var Int64 = require('node-int64');
var seed = new Int64('candy jealous elephant attitude knock tomato bracket device fantasy dune carbon capable');
// var seed = bip39.mnemonicToSeedHex('candy jealous elephant attitude knock tomato bracket device fantasy dune carbon capable');
// var seed = "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79";
// Load a private key from a seed
var privateKey = bitcore.HDPrivateKey.fromSeed(seed, "openchain");
var address = privateKey.publicKey.toAddress();
 
// Calculate the accounts corresponding to the private key
var issuancePath = "/asset/p2pkh/" + address + "/";
var assetPath = issuancePath;
var walletPath = "/p2pkh/" + address + "/";

// Calculate the accounts corresponding to the private key
var dataPath = "/asset/p2pkh/" + address + "/metadata/";
var recordName = "datarecord";
var storedData = "This is the data to store in the chain";

console.log("Issuance path: " + issuancePath);
console.log("Wallet path: " + walletPath);
 
console.log("Account path: " + dataPath);
console.log("Record name: " + recordName);

// Create an Openchain client and signer
var client = new openchain.ApiClient("http://localhost:8080/");
var signer = new openchain.MutationSigner(privateKey);
 
// Initialize the client
client.initialize()
.then(function () {
    // Retrieve the record being modified
    return client.getDataRecord(dataPath, recordName)
})
.then(function (dataRecord) {
    // Encode the data into a ByteBuffer
    var newValue = openchain.encoding.encodeString(storedData);
 	console.log("data: " + newValue);
    // Create a new transaction builder
    return new openchain.TransactionBuilder(client)
        // Add the key to the transaction builder
        .addSigningKey(signer)
        // Modify the record
        .addRecord(dataRecord.key, newValue, dataRecord.version)
        // Submit the transaction
        .submit();
})
//storage record result code
.then(function (result) { 
	console.log("Record code:");
	console.log(result); 
	console.log("-----------------------------");
})
.then(function () {
    // Create a new transaction builder
    return new openchain.TransactionBuilder(client)
        // Add the key to the transaction builder
        .addSigningKey(signer)
        // Add some metadata to the transaction
        .setMetadata({ "memo": "Issued through NodeJS" })
        // Take 100 units of the asset from the issuance path
        .updateAccountRecord(issuancePath, assetPath, -100);
})
.then(function (transactionBuilder) {
    // Add 100 units of the asset to the target wallet path
    return transactionBuilder.updateAccountRecord(walletPath, assetPath, 100);
})
.then(function (transactionBuilder) {
    // Submit the transaction
    return transactionBuilder.submit();
})
//transaction result code
.then(function (result) { 
	console.log("transaction code:");
	console.log(result); 
	console.log("-----------------------------");
});

//record data
console.log(walletPath);
console.log(assetPath);
client.getAccountRecord(walletPath, assetPath)
.then(function (result) {
	console.log("data");
    console.log(result);
    console.log("-----------------------------");
});

client.getRecord('e5ad090927593359b8cb65e866a977e30bfa269b25500b9882adab7bf7ae213f')
.then(function(result){
	console.log("final data");
    console.log(result);
    console.log("-----------------------------");
});
 