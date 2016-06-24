var gerador = function() {
  var options = (arguments.length) ? arguments[0] : {}
    , count = options.count || 1
    , units = options.units || 'paragrafos'
    , paragraphLowerBound = options.paragraphLowerBound || 3
	, paragraphUpperBound = options.paragraphUpperBound || 7
    , frases = options.frases || require('./dicionario').frases
    , suffix = options.suffix || require('os').EOL;

  var inteiroAleatorio = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var fraseAleatoria = function(frases) {
    return frases[inteiroAleatorio(0, frases.length - 1)];
  };

  var paragrafoAleatorio = function(frases, lowerBound, upperBound) {
    var paragrafo = ''
      , bounds = {min: 0, max: inteiroAleatorio(lowerBound, upperBound)};

    while (bounds.min < bounds.max) {
      paragrafo = paragrafo + '. ' + fraseAleatoria(frases);
      bounds.min = bounds.min + 1;
    }

    if (paragrafo.length) {
      paragrafo = paragrafo.slice(2);
      paragrafo = paragrafo + '.';
    }

    return paragrafo;
  }

  var iter = 0
    , bounds = {min: 0, max: count}
    , string = ''
    , prefix = ''
    , openingTag
    , closingTag;

  while (bounds.min < bounds.max) {
    switch (units.toLowerCase()) {
      case 'palavras':
        string = string + ' ' + fraseAleatoria(frases);
        break;
      case 'paragrafos':
        var nextString = paragrafoAleatorio(frases, paragraphLowerBound, paragraphUpperBound);

        nextString = nextString + suffix + suffix; 

        string = string + nextString;

        break;
    }

    bounds.min = bounds.min + 1;
  }

  if (string.length) {
    var pos = 0;

    if (string.indexOf('. ') == 0) {
      pos = 2;
    } else if (string.indexOf('.') == 0 || string.indexOf(' ') == 0) {
      pos = 1;
    }

    string = string.slice(pos);

    if (units == 'palavras') {
      string = string + '.';
    }
  }

  return string;
};

module.exports = gerador;
