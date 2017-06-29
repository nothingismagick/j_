module.exports = {
    // string operations
    firstItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(0, string.indexOf(delimiter))
    },
    lastItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(string.lastIndexOf(delimiter) + 1, string.length)
    },
    nthItemOf: function(string, n, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.split(delimiter)[n - 1]
    },
    allButFirstItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(string.indexOf(delimiter) + 1)
    },
    allButLastItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        return string.slice(0, string.lastIndexOf(delimiter))
    },
    randomItemOf: function(string, delimiter) {
        if (!delimiter) delimiter = this.guessDelimiter(string)
        var arr = string.split(delimiter)
        return arr[Math.floor(Math.random() * arr.length)]
    },

    guessDelimiter: function(string) {
        if (string.indexOf(',') > -1) {
            return ','
        }
        else if (string.indexOf('.') > -1) {
            return '.'
        }
        else if (string.indexOf('/') > -1) {
            return '/'
        }
        else if (string.indexOf('|') > -1) {
            return '|'
        }
        else {
            return "error: no delimiter"
        }
    },

    // array operations
    indexFromArray: function(arr, key, value) {
        // console.log(arr)
        var i = -1
        var test = ''
        while (test !== value && i < arr.length - 1) {
            i++
            test = arr[i][key]

            if (arr[i][key] == value) {
                // console.log('match', arr[i][key], value)
                // console.log(arr[i])
            }
        }

        if (test !== value && i == arr.length - 1) i = -1
        return i

    },

    indexFromArrayID: function(arr, value) {
        return this.indexFromArray(arr, 'id', value)
    },

    sortArrayBy: function(arr, key2sortBy) {

       function dynamicSort(key2sortBy) {
            var sortOrder = 1;
            if(key2sortBy[0] === "-") {
                sortOrder = -1;
                key2sortBy = key2sortBy.substr(1);
            }
            return function (a,b) {
                var result = (a[key2sortBy] < b[key2sortBy]) ? -1 : (a[key2sortBy] > b[key2sortBy]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        arr.sort(dynamicSort(key2sortBy))

        return arr
    },

    queryArrayFirstMatch: function(arr, key, value) {
        return arr[this.indexFromArray(arr, key, value)]
    },

    queryArrayAllMatches: function(arr, key, value) {

        var winners = []
        arr.forEach(function(a) {
            if (a[key] == value) {
                winners.push(a)
            }
        })
        return winners
    },

    queryArrayAllPartialMatches: function(arr, key, value) {

        var winners = []
        arr.forEach(function(a) {
            if (a[key].toLowerCase().indexOf(value.toLowerCase()) > -1) {
                winners.push(a)
            }
        })
        return winners
    },

    queryArrayAllUniqueValues: function(arr, key) {

        var uniques = {}
        arr.forEach(function(a) {
          uniques[a[key]] = true
        })

        return Object.keys(uniques)
    },

    queryArrayOneOfEach: function(arr, key) { // select distinct

        var uniques = {}
        arr.forEach(function(a) {
          uniques[a[key]] = a
        })

        return uniques
    },

    // object operations
    arrayOfKeyValuesFromObject: function(obj, key) {
        var arr = []
        Object.keys(obj).forEach(function(k) {
            if (obj[k][key]) arr.push(obj[k][key])
        })
        return arr
    },
    stringOfKeyValuesFromObject: function(obj, key) {
        if (Object.keys(obj).length > 0) {
            return this.arrayOfKeyValuesFromObject(obj, key).join(', ')
        }
        else {
            return ('object is empty')
        }
    },
    queryObjectFirstMatch: function(obj, key, value) {

        if (!obj) return 'object is empty'

        objKeyArray = Object.keys(obj)

        var i = -1,
            test = ''
        while (test !== value && i < objKeyArray.length - 1) {
            i++
            test = obj[objKeyArray[i]][key]
        }

        if (test !== value && i == objKeyArray.length - 1) {
          return -1
        } else {
          return obj[objKeyArray[i]]
        }

    },
    convertObj2array: function(obj) {

        var arr = []

        Object.keys(obj).forEach(function(key) {
            arr.push(obj[key])
        })

        return arr

    },

    mergeObjects: function(src, dest) {
        if (src === undefined) return dest
        if (dest === undefined) return src
        Object.keys(src).forEach(function(key) {
            dest[key] = src[key]
        })
        return dest
    },

    uaid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '-' + this.randomAnimal()
    },

    randomAlphaNumeric: function(length) {
        var result = ''
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result
    },
    
    randomAnimal: function() {
        var animals = ["aardvark","alligator","alpaca","antelope","ape","armadillo","baboon","badger","bat","bear","beaver","bison","boar","buffalo","bull","camel","canary","capybara","cat","chameleon","cheetah","chimpanzee","chinchilla","chipmunk","cougar","cow","coyote","crocodile","crow","deer","dingo","dog","donkey","dromedary","elephant","elk","ewe","ferret","finch","fish","fox","frog","gazelle","gilaMonster","giraffe","gnu","goat","gopher","gorilla","grizzlyBear","groundHog","guineaPig","hamster","hedgehog","hippopotamus","hog","horse","hyena","ibex","iguana","impala","jackal","jaguar","kangaroo","koala","lamb","lemur","leopard","lion","lizard","llama","lynx","mandrill","marmoset","mink","mole","mongoose","monkey","moose","mountainGoat","mouse","mule","muskrat","mustang","mynahBird","newt","ocelot","opossum","orangutan","oryx","otter","ox","panda","panther","parakeet","parrot","pig","platypus","polarBear","porcupine","porpoise","prairieDog","puma","rabbit","raccoon","ram","rat","reindeer","reptile","rhinoceros","salamander","seal","sheep","shrew","silverFox","skunk","sloth","snake","squirrel","tapir","tiger","toad","turtle","walrus","warthog","weasel","whale","wildcat","wolf","wolverine","wombat","woodchuck","yak","zebra"]
        return animals[Math.floor(Math.random() * animals.length)]
    },

    ucid: function(firstLetter) {
        return firstLetter + '_' + Date.now() + '-' + this.randomCrayolaColor()
    },

    randomCrayolaColor: function() {
        var crayolaColors = ["almond", "antiquebrass", "apricot", "aquamarine", "asparagus", "atomictangerine", "bananamania", "beaver", "bittersweet", "black", "blizzardblue", "blue", "bluebell", "bluegray", "bluegreen", "blueviolet", "blush", "brickred", "brown", "burntorange", "burntsienna", "cadetblue", "canary", "caribbeangreen", "carnationpink", "cerise", "cerulean", "chestnut", "copper", "cornflower", "cottoncandy", "dandelion", "denim", "desertsand", "eggplant", "electriclime", "fern", "forestgreen", "fuchsia", "fuzzywuzzy", "gold", "goldenrod", "grannysmithapple", "gray", "green", "greenblue", "greenyellow", "hotmagenta", "inchworm", "indigo", "jazzberryjam", "junglegreen", "laserlemon", "lavender", "lemonyellow", "macaroniandcheese", "magenta", "magicmint", "mahogany", "maize", "manatee", "mangotango", "maroon", "mauvelous", "melon", "midnightblue", "mountainmeadow", "mulberry", "navyblue", "neoncarrot", "olivegreen", "orange", "orangered", "orangeyellow", "orchid", "outerspace", "outrageousorange", "pacificblue", "peach", "periwinkle", "piggypink", "pinegreen", "pinkflamingo", "pinksherbet", "plum", "purpleheart", "purplemountainsmajesty", "purplepizzazz", "radicalred", "rawsienna", "rawumber", "razzledazzlerose", "razzmatazz", "red", "redorange", "redviolet", "robineggblue", "royalpurple", "salmon", "scarlet", "seagreen", "sepia", "shadow", "shamrock", "shockingpink", "silver", "skyblue", "springgreen", "sunglow", "sunsetorange", "tan", "tealblue", "thistle", "ticklemepink", "timberwolf", "tropicalrainforest", "tumbleweed", "turquoiseblue", "unmellowyellow", "violetpurple", "violetblue", "violetred", "vividtangerine", "vividviolet", "white", "wildblueyonder", "wildstrawberry", "wildwatermelon", "wisteria", "yellow", "yellowgreen", "yelloworange"]
        return crayolaColors[Math.floor(Math.random() * crayolaColors.length)]
    },

    randomInteger: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    escapeQuotes: function(string) {
        string = string.replace(/"/g, '\\"')
        string = string.replace(/'/g, "\\'")
        return string
    },

    educateQuotes: function(string) {

        // var chunks = string.match(/(<.+?>|[^<]+)/g)
        // console.log('chunks: ', chunks)

        // var cleaned = chunks.map(function(chunk){
        //     return /</.test(chunk) ? chunk : clean(chunk)
        // }).join('');

        // function clean(chunk) {
        //     console.log('CHUNK: ', chunk)
        //     if (!chunk) return ''

        //     chunk = chunk.replace(/"([^"]*)"/g, "“$1”").replace(/\b"/g, "”")
        //     chunk = chunk.replace(/'/g, "’")
        //     return chunk
        // }

        // console.log('educated: ', cleaned)
        // return cleaned
        string = string.replace(/"([^"]*)"/g, "“$1”").replace(/\b"/g, "”")
        string = string.replace(/'/g, "’")

        
        // now handle within html
        return string.replace(/>([^>]+)</g, function(r) {
            r = r.replace(/(>|\s)"/g, "$1“")
                    .replace(/"/g, "”")
                    // .replace(/("|\s)'/g, "$1‘")
                    .replace(/'\b/g, "\u2018")
                    .replace(/\b'/g, "\u2019")
                    .replace(/\b\u2018\b/g,  "'")
                    // .replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018")
                    .replace(/'/g, "’");
            return r
        })
    },

    replaceHtmlAttributeQuotes: function(string) {
        string = string.replace(/<([^>]+)>/g, function(r) {
            // console.log('before', r)
            r = r.replace(/”/g, '"')
            .replace(/“/g, '"')
            .replace(/\"/g, "\'")
            .replace(/’/g, "'")
            .replace(/‘/g, "'")

            // console.log('after', r)
            return r
            // return r.replace(/\\"/g, "\\'");
            });
            // console.log('updated string:', string)
        return string
        // return string.replace(/<([^>]+)>/g, function(r) {
        //     console.log(r)
        //     r = r.replace(/\\"/g, "\\'")
        //     console.log(r)
        //     return r
        //     // return r.replace(/\\"/g, "\\'");
        //     });
    },

    straightenQuotes: function(string) {
        return string.replace(/[“”]/g, "\"").replace(/[‘’]/g, "'")

    },

    subVars: function(template, varsObj) {
        for (var p in varsObj) {
            var reg = new RegExp('{{'+p+'}}', "g")
            template = template.replace(reg, varsObj[p])
        }
        return template
    },

    decodeHtmlEntity: function(str) {
      return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
      });
    },

    decodeHTML: function(html) {
        html = html.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        })

        // html = html.replace(/&amp;/g, '&')
        // html = html.replace(/&Atilde;/g, String.fromCharCode(0x00c3))
        html =  html.replace(/&[a-z]+;/gi, function(entity) {
          switch (entity) {
          case '&quot;': return String.fromCharCode(0x0022);
          case '&amp;': return String.fromCharCode(0x0026);
          case '&lt;': return String.fromCharCode(0x003c);
          case '&gt;': return String.fromCharCode(0x003e);
          case '&nbsp;': return String.fromCharCode(0x00a0);
          case '&iexcl;': return String.fromCharCode(0x00a1);
          case '&cent;': return String.fromCharCode(0x00a2);
          case '&pound;': return String.fromCharCode(0x00a3);
          case '&curren;': return String.fromCharCode(0x00a4);
          case '&yen;': return String.fromCharCode(0x00a5);
          case '&brvbar;': return String.fromCharCode(0x00a6);
          case '&sect;': return String.fromCharCode(0x00a7);
          case '&uml;': return String.fromCharCode(0x00a8);
          case '&copy;': return String.fromCharCode(0x00a9);
          case '&ordf;': return String.fromCharCode(0x00aa);
          case '&laquo;': return String.fromCharCode(0x00ab);
          case '&not;': return String.fromCharCode(0x00ac);
          case '&shy;': return String.fromCharCode(0x00ad);
          case '&reg;': return String.fromCharCode(0x00ae);
          case '&macr;': return String.fromCharCode(0x00af);
          case '&deg;': return String.fromCharCode(0x00b0);
          case '&plusmn;': return String.fromCharCode(0x00b1);
          case '&sup2;': return String.fromCharCode(0x00b2);
          case '&sup3;': return String.fromCharCode(0x00b3);
          case '&acute;': return String.fromCharCode(0x00b4);
          case '&micro;': return String.fromCharCode(0x00b5);
          case '&para;': return String.fromCharCode(0x00b6);
          case '&middot;': return String.fromCharCode(0x00b7);
          case '&cedil;': return String.fromCharCode(0x00b8);
          case '&sup1;': return String.fromCharCode(0x00b9);
          case '&ordm;': return String.fromCharCode(0x00ba);
          case '&raquo;': return String.fromCharCode(0x00bb);
          case '&frac14;': return String.fromCharCode(0x00bc);
          case '&frac12;': return String.fromCharCode(0x00bd);
          case '&frac34;': return String.fromCharCode(0x00be);
          case '&iquest;': return String.fromCharCode(0x00bf);
          case '&Agrave;': return String.fromCharCode(0x00c0);
          case '&Aacute;': return String.fromCharCode(0x00c1);
          case '&Acirc;': return String.fromCharCode(0x00c2);
          case '&Atilde;': return String.fromCharCode(0x00c3);
          case '&Auml;': return String.fromCharCode(0x00c4);
          case '&Aring;': return String.fromCharCode(0x00c5);
          case '&AElig;': return String.fromCharCode(0x00c6);
          case '&Ccedil;': return String.fromCharCode(0x00c7);
          case '&Egrave;': return String.fromCharCode(0x00c8);
          case '&Eacute;': return String.fromCharCode(0x00c9);
          case '&Ecirc;': return String.fromCharCode(0x00ca);
          case '&Euml;': return String.fromCharCode(0x00cb);
          case '&Igrave;': return String.fromCharCode(0x00cc);
          case '&Iacute;': return String.fromCharCode(0x00cd);
          case '&Icirc;': return String.fromCharCode(0x00ce);
          case '&Iuml;': return String.fromCharCode(0x00cf);
          case '&ETH;': return String.fromCharCode(0x00d0);
          case '&Ntilde;': return String.fromCharCode(0x00d1);
          case '&Ograve;': return String.fromCharCode(0x00d2);
          case '&Oacute;': return String.fromCharCode(0x00d3);
          case '&Ocirc;': return String.fromCharCode(0x00d4);
          case '&Otilde;': return String.fromCharCode(0x00d5);
          case '&Ouml;': return String.fromCharCode(0x00d6);
          case '&times;': return String.fromCharCode(0x00d7);
          case '&Oslash;': return String.fromCharCode(0x00d8);
          case '&Ugrave;': return String.fromCharCode(0x00d9);
          case '&Uacute;': return String.fromCharCode(0x00da);
          case '&Ucirc;': return String.fromCharCode(0x00db);
          case '&Uuml;': return String.fromCharCode(0x00dc);
          case '&Yacute;': return String.fromCharCode(0x00dd);
          case '&THORN;': return String.fromCharCode(0x00de);
          case '&szlig;': return String.fromCharCode(0x00df);
          case '&agrave;': return String.fromCharCode(0x00e0);
          case '&aacute;': return String.fromCharCode(0x00e1);
          case '&acirc;': return String.fromCharCode(0x00e2);
          case '&atilde;': return String.fromCharCode(0x00e3);
          case '&auml;': return String.fromCharCode(0x00e4);
          case '&aring;': return String.fromCharCode(0x00e5);
          case '&aelig;': return String.fromCharCode(0x00e6);
          case '&ccedil;': return String.fromCharCode(0x00e7);
          case '&egrave;': return String.fromCharCode(0x00e8);
          case '&eacute;': return String.fromCharCode(0x00e9);
          case '&ecirc;': return String.fromCharCode(0x00ea);
          case '&euml;': return String.fromCharCode(0x00eb);
          case '&igrave;': return String.fromCharCode(0x00ec);
          case '&iacute;': return String.fromCharCode(0x00ed);
          case '&icirc;': return String.fromCharCode(0x00ee);
          case '&iuml;': return String.fromCharCode(0x00ef);
          case '&eth;': return String.fromCharCode(0x00f0);
          case '&ntilde;': return String.fromCharCode(0x00f1);
          case '&ograve;': return String.fromCharCode(0x00f2);
          case '&oacute;': return String.fromCharCode(0x00f3);
          case '&ocirc;': return String.fromCharCode(0x00f4);
          case '&otilde;': return String.fromCharCode(0x00f5);
          case '&ouml;': return String.fromCharCode(0x00f6);
          case '&divide;': return String.fromCharCode(0x00f7);
          case '&oslash;': return String.fromCharCode(0x00f8);
          case '&ugrave;': return String.fromCharCode(0x00f9);
          case '&uacute;': return String.fromCharCode(0x00fa);
          case '&ucirc;': return String.fromCharCode(0x00fb);
          case '&uuml;': return String.fromCharCode(0x00fc);
          case '&yacute;': return String.fromCharCode(0x00fd);
          case '&thorn;': return String.fromCharCode(0x00fe);
          case '&yuml;': return String.fromCharCode(0x00ff);
          case '&OElig;': return String.fromCharCode(0x0152);
          case '&oelig;': return String.fromCharCode(0x0153);
          case '&Scaron;': return String.fromCharCode(0x0160);
          case '&scaron;': return String.fromCharCode(0x0161);
          case '&Yuml;': return String.fromCharCode(0x0178);
          case '&fnof;': return String.fromCharCode(0x0192);
          case '&circ;': return String.fromCharCode(0x02c6);
          case '&tilde;': return String.fromCharCode(0x02dc);
          case '&Alpha;': return String.fromCharCode(0x0391);
          case '&Beta;': return String.fromCharCode(0x0392);
          case '&Gamma;': return String.fromCharCode(0x0393);
          case '&Delta;': return String.fromCharCode(0x0394);
          case '&Epsilon;': return String.fromCharCode(0x0395);
          case '&Zeta;': return String.fromCharCode(0x0396);
          case '&Eta;': return String.fromCharCode(0x0397);
          case '&Theta;': return String.fromCharCode(0x0398);
          case '&Iota;': return String.fromCharCode(0x0399);
          case '&Kappa;': return String.fromCharCode(0x039a);
          case '&Lambda;': return String.fromCharCode(0x039b);
          case '&Mu;': return String.fromCharCode(0x039c);
          case '&Nu;': return String.fromCharCode(0x039d);
          case '&Xi;': return String.fromCharCode(0x039e);
          case '&Omicron;': return String.fromCharCode(0x039f);
          case '&Pi;': return String.fromCharCode(0x03a0);
          case '& Rho ;': return String.fromCharCode(0x03a1);
          case '&Sigma;': return String.fromCharCode(0x03a3);
          case '&Tau;': return String.fromCharCode(0x03a4);
          case '&Upsilon;': return String.fromCharCode(0x03a5);
          case '&Phi;': return String.fromCharCode(0x03a6);
          case '&Chi;': return String.fromCharCode(0x03a7);
          case '&Psi;': return String.fromCharCode(0x03a8);
          case '&Omega;': return String.fromCharCode(0x03a9);
          case '&alpha;': return String.fromCharCode(0x03b1);
          case '&beta;': return String.fromCharCode(0x03b2);
          case '&gamma;': return String.fromCharCode(0x03b3);
          case '&delta;': return String.fromCharCode(0x03b4);
          case '&epsilon;': return String.fromCharCode(0x03b5);
          case '&zeta;': return String.fromCharCode(0x03b6);
          case '&eta;': return String.fromCharCode(0x03b7);
          case '&theta;': return String.fromCharCode(0x03b8);
          case '&iota;': return String.fromCharCode(0x03b9);
          case '&kappa;': return String.fromCharCode(0x03ba);
          case '&lambda;': return String.fromCharCode(0x03bb);
          case '&mu;': return String.fromCharCode(0x03bc);
          case '&nu;': return String.fromCharCode(0x03bd);
          case '&xi;': return String.fromCharCode(0x03be);
          case '&omicron;': return String.fromCharCode(0x03bf);
          case '&pi;': return String.fromCharCode(0x03c0);
          case '&rho;': return String.fromCharCode(0x03c1);
          case '&sigmaf;': return String.fromCharCode(0x03c2);
          case '&sigma;': return String.fromCharCode(0x03c3);
          case '&tau;': return String.fromCharCode(0x03c4);
          case '&upsilon;': return String.fromCharCode(0x03c5);
          case '&phi;': return String.fromCharCode(0x03c6);
          case '&chi;': return String.fromCharCode(0x03c7);
          case '&psi;': return String.fromCharCode(0x03c8);
          case '&omega;': return String.fromCharCode(0x03c9);
          case '&thetasym;': return String.fromCharCode(0x03d1);
          case '&upsih;': return String.fromCharCode(0x03d2);
          case '&piv;': return String.fromCharCode(0x03d6);
          case '&ensp;': return String.fromCharCode(0x2002);
          case '&emsp;': return String.fromCharCode(0x2003);
          case '&thinsp;': return String.fromCharCode(0x2009);
          case '&zwnj;': return String.fromCharCode(0x200c);
          case '&zwj;': return String.fromCharCode(0x200d);
          case '&lrm;': return String.fromCharCode(0x200e);
          case '&rlm;': return String.fromCharCode(0x200f);
          case '&ndash;': return String.fromCharCode(0x2013);
          case '&mdash;': return String.fromCharCode(0x2014);
          case '&lsquo;': return String.fromCharCode(0x2018);
          case '&rsquo;': return String.fromCharCode(0x2019);
          case '&#8217;': return String.fromCharCode(0x2019);
          case '&sbquo;': return String.fromCharCode(0x201a);
          case '&ldquo;': return String.fromCharCode(0x201c);
          case '&rdquo;': return String.fromCharCode(0x201d);
          case '&bdquo;': return String.fromCharCode(0x201e);
          case '&dagger;': return String.fromCharCode(0x2020);
          case '&Dagger;': return String.fromCharCode(0x2021);
          case '&bull;': return String.fromCharCode(0x2022);
          case '&hellip;': return String.fromCharCode(0x2026);
          case '&permil;': return String.fromCharCode(0x2030);
          case '&prime;': return String.fromCharCode(0x2032);
          case '&Prime;': return String.fromCharCode(0x2033);
          case '&lsaquo;': return String.fromCharCode(0x2039);
          case '&rsaquo;': return String.fromCharCode(0x203a);
          case '&oline;': return String.fromCharCode(0x203e);
          case '&frasl;': return String.fromCharCode(0x2044);
          case '&euro;': return String.fromCharCode(0x20ac);
          case '&image;': return String.fromCharCode(0x2111);
          case '&weierp;': return String.fromCharCode(0x2118);
          case '&real;': return String.fromCharCode(0x211c);
          case '&trade;': return String.fromCharCode(0x2122);
          case '&alefsym;': return String.fromCharCode(0x2135);
          case '&larr;': return String.fromCharCode(0x2190);
          case '&uarr;': return String.fromCharCode(0x2191);
          case '&rarr;': return String.fromCharCode(0x2192);
          case '&darr;': return String.fromCharCode(0x2193);
          case '&harr;': return String.fromCharCode(0x2194);
          case '&crarr;': return String.fromCharCode(0x21b5);
          case '&lArr;': return String.fromCharCode(0x21d0);
          case '&uArr;': return String.fromCharCode(0x21d1);
          case '&rArr;': return String.fromCharCode(0x21d2);
          case '&dArr;': return String.fromCharCode(0x21d3);
          case '&hArr;': return String.fromCharCode(0x21d4);
          case '&forall;': return String.fromCharCode(0x2200);
          case '&part;': return String.fromCharCode(0x2202);
          case '&exist;': return String.fromCharCode(0x2203);
          case '&empty;': return String.fromCharCode(0x2205);
          case '&nabla;': return String.fromCharCode(0x2207);
          case '&isin;': return String.fromCharCode(0x2208);
          case '&notin;': return String.fromCharCode(0x2209);
          case '&ni;': return String.fromCharCode(0x220b);
          case '&prod;': return String.fromCharCode(0x220f);
          case '&sum;': return String.fromCharCode(0x2211);
          case '&minus;': return String.fromCharCode(0x2212);
          case '&lowast;': return String.fromCharCode(0x2217);
          case '&radic;': return String.fromCharCode(0x221a);
          case '&prop;': return String.fromCharCode(0x221d);
          case '&infin;': return String.fromCharCode(0x221e);
          case '&ang;': return String.fromCharCode(0x2220);
          case '&and;': return String.fromCharCode(0x2227);
          case '&or;': return String.fromCharCode(0x2228);
          case '&cap;': return String.fromCharCode(0x2229);
          case '&cup;': return String.fromCharCode(0x222a);
          case '&int;': return String.fromCharCode(0x222b);
          case '&there4;': return String.fromCharCode(0x2234);
          case '&sim;': return String.fromCharCode(0x223c);
          case '&cong;': return String.fromCharCode(0x2245);
          case '&asymp;': return String.fromCharCode(0x2248);
          case '&ne;': return String.fromCharCode(0x2260);
          case '&equiv;': return String.fromCharCode(0x2261);
          case '&le;': return String.fromCharCode(0x2264);
          case '&ge;': return String.fromCharCode(0x2265);
          case '&sub;': return String.fromCharCode(0x2282);
          case '&sup;': return String.fromCharCode(0x2283);
          case '&nsub;': return String.fromCharCode(0x2284);
          case '&sube;': return String.fromCharCode(0x2286);
          case '&supe;': return String.fromCharCode(0x2287);
          case '&oplus;': return String.fromCharCode(0x2295);
          case '&otimes;': return String.fromCharCode(0x2297);
          case '&perp;': return String.fromCharCode(0x22a5);
          case '&sdot;': return String.fromCharCode(0x22c5);
          case '&lceil;': return String.fromCharCode(0x2308);
          case '&rceil;': return String.fromCharCode(0x2309);
          case '&lfloor;': return String.fromCharCode(0x230a);
          case '&rfloor;': return String.fromCharCode(0x230b);
          case '&lang;': return String.fromCharCode(0x2329);
          case '&rang;': return String.fromCharCode(0x232a);
          case '&loz;': return String.fromCharCode(0x25ca);
          case '&spades;': return String.fromCharCode(0x2660);
          case '&clubs;': return String.fromCharCode(0x2663);
          case '&hearts;': return String.fromCharCode(0x2665);
          case '&diams;': return String.fromCharCode(0x2666);
          default: return '';
          }
         })

         html = html.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
                var num = parseInt(numStr, 10); // read num as normal number
                return String.fromCharCode(num);
            });
        return html
    }
}