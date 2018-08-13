var openchain = require("openchain");

var bitcore = require("bitcore-lib");

var seed = "electric fluid mule proud weekend all brush loyal shell squeeze coast amateur";

// Load a private key from a seed
var privateKey = bitcore.HDPrivateKey.fromSeed(seed, "openchain");
var address = privateKey.publicKey.toAddress();

// Create an Openchain client and signer
var signer = new openchain.MutationSigner(privateKey);
var client = new openchain.ApiClient("http://localhost:8080/");

// Calculate the accounts corresponding to the private key
var issuancePath = "/asset/p2pkh/" + address + "/";
var assetPath = issuancePath;
var walletPath = "/p2pkh/" + address + "/";

client.getAccountRecord(
    // Account path
    "/p2pkh/XqBXu7kB8Se5UskxQJcqBPQSz4Xd4nvywd/",
    // Asset path
    "/asset/p2pkh/XnAXeH5KSRbBYDy2XdEFEDtNi89fDxDZSG/")
.then(function (result) {
    console.log("Balance: " + result.balance.toString());
});


console.log("Issuance path: " + issuancePath);
console.log("Wallet path: " + walletPath);


// Initialize the client
client.initialize()
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
.then(function (result) { console.log(result); });