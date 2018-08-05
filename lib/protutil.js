

function objKeySort(arys) {
    var newkey = Object.keys(arys).sort();
    var newObj = {};
    for(var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = arys[newkey[i]];
    }
    return newObj;
}


module.exports = {
    objSort: objKeySort,
}