
var ethLightwallet = require("eth-lightwallet")
var ethereumjswallet = require("ethereumjs-wallet")
var hdkey = require("ethereumjs-wallet/hdkey")
var Mnemonic = require('bitcore-mnemonic');

var hdPathString = "m/44'/60'/0'/0/0"

var Wallet = function(){
    this._wallet = undefined
    this._ks = undefined
}


Wallet.generateMnemonicSeed = function (){
    var code = new Mnemonic(Mnemonic.Words.ENGLISH);
    return code.toString()
}

Wallet.isMnemonicValid = function (wordsList){
    return Mnemonic.isValid(wordsList,Mnemonic.Words.ENGLISH)
}

Wallet.prototype.getKS = function (){
    return this._ks;
}

Wallet.prototype.getEthereumjsWallet = function(){
    return this._wallet;
}


/**
 * Generate a wallet with Mnemonic
 * @param password
 */
Wallet.prototype.generateFromMnemonic = function(password){
    var wordslist = Wallet.generateMnemonicSeed()
    try{
        this.importFromMnemonic(wordslist,password)
    }catch (e) {
        throw e;
    }
    return wordslist;
}

/**
 * Import wallet from Mnemonic
 * @param wordsList
 * @param password
 */
Wallet.prototype.importFromMnemonic = function (wordsList,password){

    if(typeof wordsList !== 'string'){
        throw new Error("Seed words list must be a string")
    }

    if(Wallet.isMnemonicValid(wordsList) == false){
        throw new Error("Mnemonic is not valid")
    }

    var code = new Mnemonic(wordsList)
    var fixhd = hdkey.fromMasterSeed(code.toSeed())
    var hdnode  = fixhd.derivePath(hdPathString)
    this._wallet = hdnode.getWallet()
    this._ks = this._wallet.toV3(password)
}






module.exports = Wallet