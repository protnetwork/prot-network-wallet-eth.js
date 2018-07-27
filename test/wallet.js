var expect = require('chai').expect
var Wallet = require("../lib/wallet")

var words = "club hedgehog guide door stock submit catch time lobster negative visit praise"
var password = "12345678"

describe("Wallet with Mnemonic",function(){

    it("generate and import",function(){

        console.log(words)
        var w = new Wallet()
        w.importFromMnemonic(words,password)
        var ww = w._wallet;
        var ks = ww.toV3("12345678")
        console.log(ks)
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