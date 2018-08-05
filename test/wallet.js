var expect = require('chai').expect
var Wallet = require("../lib/wallet")
var protUtil = require("../lib/protutil")


var words = "club hedgehog guide door stock submit catch time lobster negative visit praise"
var password = "12345678"
var privateKey = "0x66e375a8b425af65db846eb065a96a84b30a551f117581e6a71bb22a346c6140"
var ks_ = "";
describe("Wallet with Mnemonic",function(){

    it("generate and import",function(done){

        console.log(words)
        var w = new Wallet()
        w.importFromMnemonic(words,password)
        var ww = w._wallet;
        console.log(ww.getPrivateKey())
        var ks = ww.toV3("12345678")
        ks_= JSON.stringify(protUtil.objSort(ks))
        console.log(ks_)
        done();
    }),

    it("Is valid",function(){
        var isValid = Wallet.isMnemonicValid(words)
        expect(isValid).to.equal(true)
    })

    it("Generate wallet",function(){
        var w = new Wallet()
        var wordslist = w.generateFromMnemonic(password)
        console.log(wordslist)
    })

})

describe("Wallet with privateKey",function(){
    it("Generate privateKey",function(done){
        var w = new Wallet()
        var wordslist = w.generateFromMnemonic(password)
        console.log(w.getPrivateKeyString())
        done()
    })

    it("Import from private key",function(done){
        var w = new Wallet()
        w.importFromPrivateKey(privateKey,password)
        var privKey = w.getPrivateKeyString()
        expect(privKey).to.equal(privateKey)
        done()
    })
})

describe("Wallet with keystore",function(){
    it("Import from keystore",function(done){
        this.timeout(15000)
        var w = new Wallet()
        w.importFromKeystore(ks_,password)
        var ww = w._wallet;
        console.log(ww.getPrivateKey())
        var ks = ww.toV3("12345678")
        ks = JSON.stringify(protUtil.objSort(ks))
        console.log(ks)
        done()
    })
})