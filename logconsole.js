module.exports = function (mod) {
    var modTxt = getModTxt(mod);

    var obj = {};
    obj.log = function () {
        var args = prefix().concat([].slice.apply(arguments));
        console.log.apply(console, args);
    };
    obj.error = function () {
        var args = prefix().concat(['!!!ERROR'], [].slice.apply(arguments));
        console.error.apply(console, args);
    }

    obj.log('log attached');
    return obj;

    function prefix() {
        var d = new Date();
        var time = fmt(d.getHours(), 2) + ':' + fmt(d.getMinutes(), 2) + ':' + fmt(d.getSeconds(), 2) + '.' + fmt(d.getMilliseconds(), 3);
        return [time, modTxt, '-'];
    }
}

function getModTxt(mod) {
    var modTxt;
    if (mod.parent) {
        var start = commonSubstring(mod.filename, mod.parent.filename);
        modTxt = mod.filename.substring(start.length);
        
        var slash = modTxt.lastIndexOf('\\');
        if (slash != -1) {
            modTxt = modTxt.substring(0, slash);
        }
    }
    else {
        modTxt = mod.filename.substring(mod.filename.lastIndexOf('\\') + 1);
    }

    modTxt = modTxt.replace(/\.js/, '');
    return modTxt;
}

function commonSubstring() {
    var words = arguments;
    var iChar, iWord,
        refWord = words[0],
        lRefWord = refWord.length,
        lWords = words.length;
    for (iChar = 0; iChar < lRefWord; iChar += 1) {
        for (iWord = 1; iWord < lWords; iWord += 1) {
            if (refWord[iChar] !== words[iWord][iChar]) {
                return refWord.substring(0, iChar);
            }
        }
    }
    return refWord;
}

function fmt(str, cnt) {
    str = str.toString();
    while (str.length < cnt) {
        str = '0' + str;
    }
    return str;
}