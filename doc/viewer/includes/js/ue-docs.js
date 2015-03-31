!(function( $ )
{
    var json = [
        
    {
        "name": "ue-core",
        "modules": [
            "ue-core-foo",
            "ue-core-array",
            "ue-core-collection",
            "ue-core-css",
            "ue-core-function",
            "ue-core-number",
            "ue-core-object",
            "ue-core-string",
            "ue-core-var"
        ],
        "methods": [],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core.js",
        "line": 3
    },
    {
        "name": "ue-core-foo",
        "modules": [],
        "methods": [
            {
                "name": "indexOf",
                "type": "method",
                "module": "ue-core-foo",
                "description": "FOO BAR.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-array.js",
                "line": 9,
                "overloads": [],
                "example": [
                    "\n     \n  var matrix = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];\n\n  // 4\n  ue.indexOf( matrix, 5 );  \n\n  // -1\n  ue.indexOf( matrix, 10 );"
                ]
            }
        ],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-array.js",
        "line": 3
    },
    {
        "name": "ue-core-array",
        "modules": [],
        "methods": [
            {
                "name": "indexOf",
                "type": "method",
                "module": "ue-core-array",
                "description": "Returns the index at which value can be found in the array, or -1 if value is not present in the array.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-array.js",
                "line": 53,
                "overloads": [],
                "example": [
                    "\n     \n  var matrix = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];\n\n  // 4\n  ue.indexOf( matrix, 5 );  \n\n  // -1\n  ue.indexOf( matrix, 10 );"
                ]
            },
            {
                "name": "sortedIndex",
                "type": "method",
                "module": "ue-core-array",
                "description": "Uses a binary search to determine the index at which the value should be inserted into the array in order to maintain the array's sorted order.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-array.js",
                "line": 92,
                "overloads": [],
                "example": [
                    "\n     \n  var numbers = [ 10, 20, 30, 40, 50 ],\n\n      objects = [{x: 10}, {x: 20}, {x: 30}, {x: 40}],\n\n      context = {1: 2, 2: 3, 3: 4};\n\n  // 3\n  ue.sortedIndex( numbers, 35 );\n\n  // 2\n  ue.sortedIndex( numbers, 30 );\n\n  // 2\n  ue.sortedIndex( objects, { x: 25 }, function( obj )\n  {\n      return obj.x;\n  })\n\n  // 3\n  ue.sortedIndex( objects, { x: 35 }, 'x' )\n\n  // 1\n  ue.sortedIndex( [ 1, 3 ], 2, function( obj )\n  { \n      return this[ obj ];\n  }, context );"
                ]
            }
        ],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-array.js",
        "line": 30
    },
    {
        "name": "ue-core-collection",
        "modules": [],
        "methods": [
            {
                "name": "each",
                "type": "method",
                "module": "ue-core-collection",
                "description": "Realiza una llamada a un iterador por cada uno de elementos contenidos en la colección.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-collection.js",
                "line": 10,
                "overloads": [],
                "example": [
                    "\n     \n  // true\n  var fn = function( callback )\n  {\n     callback     = callback || ue.noop();\n  };"
                ]
            },
            {
                "name": "contains",
                "type": "method",
                "module": "ue-core-collection",
                "description": "Returns true if the value is present in the list. Uses indexOf internally, if list is an Array.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-collection.js",
                "line": 47,
                "overloads": [],
                "example": [
                    "\n     \n  ue.contains( test, 'test' )"
                ]
            }
        ],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-collection.js",
        "line": 3
    },
    {
        "name": "ue-core-css",
        "modules": [],
        "methods": [],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-css.js",
        "line": 3
    },
    {
        "name": "ue-core-function",
        "modules": [],
        "methods": [
            {
                "name": "noop",
                "type": "method",
                "module": "ue-core-function",
                "description": "Makes a empty function usefull to set a variable fallback helper.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
                "line": 19,
                "overloads": [],
                "example": [
                    "\n     \n  var fn = function( callback )\n  {\n     return callback || ue.noop();\n  };\n  \n  // Function\n  fn( null )"
                ]
            },
            {
                "name": "negate",
                "type": "method",
                "module": "ue-core-function",
                "description": "Returns a negated version of the callback function.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
                "line": 40,
                "overloads": [],
                "example": [
                    "\n     \n  var fn = function( )\n  {\n     return true;\n  };\n  \n  // true\n  fn();\n\n  // false\n  negate( fn )();\n"
                ]
            },
            {
                "name": "lambda",
                "type": "method",
                "module": "ue-core-function",
                "description": "Create a lambda function with the return expresion assigned by parameter.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
                "line": 69,
                "overloads": [],
                "example": [
                    "\n     \n  var sum = ue.lambda( 'x+y' );\n  \n  // 2\n  sum( 1, 1 );"
                ]
            },
            {
                "name": "prepare",
                "type": "method",
                "module": "ue-core-function",
                "description": "Prepare a callback with fixed arguments checking if context exists.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
                "line": 87,
                "overloads": [],
                "example": [
                    "\n     \n  var context     = [ 1, 2, 3, 4 ],\n\n      fn          = ue.prepare( function( index )\n      {\n          return this[ index ] * index;\n      }, context, 1 );\n     \n      // 0\n      fn( 0 );\n\n      // 2\n      fn( 1 );\n\n      // 5\n      fn( 2 );"
                ]
            },
            {
                "name": "iterator",
                "type": "method",
                "module": "ue-core-function",
                "description": "Return a iterator function depending by value type.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
                "line": 127,
                "overloads": [],
                "example": [
                    "\n     \n  var collection  = [ { 'foo' : 1, 'bar' : 2 }, { 'foo' : 3, 'bar' : 4 }],\n\n      ite_fn      = ue.iterator( function( value, key, collection )\n      {\n          return value[ 'foo' ];\n      }),\n\n      ite_str     = ue.iterator( 'foo' ),\n\n      ite_obj     = ue.iterator({ 'foo' : 1, 'bar' : 2 });\n\n      for (var i = 0; i < collection.length; i ++ ) \n      {\n          ite_fn( collection[ i ], i , collection ) // 1 | 3\n\n          ite_str( collection[ i ], i , collection ) // 1 | 3\n\n          ite_obj( collection[ i ], i , collection ) // true | false\n      }"
                ]
            },
            {
                "name": "noop",
                "type": "method",
                "module": "ue-core-function",
                "description": "Crea una función vacia. // TODO",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
                "line": 173,
                "overloads": [],
                "example": [
                    "\n     \n  // true\n  var fn = function( callback )\n  {\n     callback     = callback || ue.noop();\n  };"
                ]
            },
            {
                "name": "throttle",
                "type": "method",
                "module": "ue-core-function",
                "description": "Returns a function, that, when invoked, will only be triggered at most once\nduring a given window of time. Normally, the throttled function will run\nas much as it can, without ever going more than once per `wait` duration;\nbut if you'd like to disable the execution on the leading edge, pass\n`{leading: false}`. To disable execution on the trailing edge, ditto.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
                "line": 204,
                "overloads": [],
                "example": [
                    "\n     \n  var throttled = ue.throttle( updatePosition, 100 );\n\n  ue( window ).on( 'scroll', throttled );"
                ]
            }
        ],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-function.js",
        "line": 3
    },
    {
        "name": "ue-core-number",
        "modules": [],
        "methods": [
            {
                "name": "rand",
                "type": "method",
                "module": "ue-core-number",
                "description": "Crea un número aleatorio comprendido entre 0 y 1 en caso de no haber especificado un valor min ni max",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 23,
                "overloads": [],
                "example": [
                    "\n     \n  // 0.256878454\n  ue.rand();\n  \n  // 5\n  ue.rand( 10 );\n\n  // 35\n  ue.rand( 0, 50 );"
                ]
            },
            {
                "name": "rand",
                "type": "method",
                "module": "ue-core-number",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 40,
                "overloads": []
            },
            {
                "name": "rand",
                "type": "method",
                "module": "ue-core-number",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 46,
                "overloads": []
            },
            {
                "name": "even",
                "type": "method",
                "module": "ue-core-number",
                "description": "Determina si un número es __Par__.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 60,
                "overloads": [],
                "example": [
                    "\n     \n  // true\n  ue.even( 0 );\n  \n  // false\n  ue.even( 1 );\n\n  // true\n  ue.even( 2 );"
                ]
            },
            {
                "name": "odd",
                "type": "method",
                "module": "ue-core-number",
                "description": "Determina si un número es __Impar__.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 82,
                "overloads": [],
                "example": [
                    "\n     \n  // false\n  ue.odd( 0 );\n  \n  // true\n  ue.odd( 1 );\n\n  // false\n  ue.odd( 2 );"
                ]
            },
            {
                "name": "between",
                "type": "method",
                "module": "ue-core-number",
                "description": "Fija como valores máximo y del número introducido en el parametro `number`. En caso que el número introducido sea mayor que el valor máximo aceptado, devolverá el valor máximo, lo mismo ocurre con el caso contrario.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 104,
                "overloads": [],
                "example": [
                    "\n     \n  // 5\n  ue.between( -5, 5, 10 );"
                ]
            },
            {
                "name": "min",
                "type": "method",
                "module": "ue-core-number",
                "description": "Recorre todos los argumentos en busca del número menor de la serie.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 122,
                "overloads": [],
                "example": [
                    "\n     \n  // - 5\n  ue.min( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );"
                ]
            },
            {
                "name": "max",
                "type": "method",
                "module": "ue-core-number",
                "description": "Recorre todos los argumentos en busca del número mayor de la serie.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 143,
                "overloads": [],
                "example": [
                    "\n     \n  // 9\n  ue.max( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );"
                ]
            },
            {
                "name": "avg",
                "type": "method",
                "module": "ue-core-number",
                "description": "Recorre todos los argumentos devolviendo el valor medio.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 164,
                "overloads": [],
                "example": [
                    "\n     \n  // 4.194444444444444\n  ue.avg( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );"
                ]
            },
            {
                "name": "pow",
                "type": "method",
                "module": "ue-core-number",
                "description": "Recorre todos los argumentos devolviendo el valor total de la multiplicación.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 185,
                "overloads": [],
                "example": [
                    "\n     \n  // -1088640\n  ue.pow( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );"
                ]
            },
            {
                "name": "div",
                "type": "method",
                "module": "ue-core-number",
                "description": "Recorre todos los argumentos devolviendo el valor total de la división.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 206,
                "overloads": [],
                "example": [
                    "\n     \n  // -347.1428571428571\n  ue.div( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );"
                ]
            },
            {
                "name": "sum",
                "type": "method",
                "module": "ue-core-number",
                "description": "Recorre todos los argumentos devolviendo el valor total de la suma.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
                "line": 227,
                "overloads": [],
                "example": [
                    "\n     \n  // 37\n  ue.sum( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );"
                ]
            }
        ],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-number.js",
        "line": 3,
        "description": "Funcionalidad numerica."
    },
    {
        "name": "ue-core-object",
        "modules": [],
        "methods": [
            {
                "name": "keys",
                "type": "method",
                "module": "ue-core-object",
                "description": "Devuelve un array que contiene todas las claves del objeto.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-object.js",
                "line": 14,
                "overloads": [],
                "example": [
                    "\n\n  // [ \"foo\", \"bar\" ]\n  ue.keys({ foo : \"bar\", bar : \"foo\" });"
                ]
            },
            {
                "name": "values",
                "type": "method",
                "module": "ue-core-object",
                "description": "Devuelve un array que contiene todas las claves del objeto.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-object.js",
                "line": 52,
                "overloads": [],
                "example": [
                    "\n\n  // [ \"foo\", \"bar\" ]\n  ue.values({ foo : \"bar\", bar : \"foo\" });"
                ]
            },
            {
                "name": "property",
                "type": "method",
                "module": "ue-core-object",
                "description": "Returns a function that will itself return the key property of any passed-in object.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-object.js",
                "line": 79,
                "overloads": [],
                "example": [
                    "\n\n  // \"item_2\"\n  var json    = \n  {\n      'foo'   :\n      {\n          'bar'   :\n          [\n              'item_1',\n              'item_2'\n          ]\n      }\n  };\n\n  ue.property( \"foo.bar.2\" )( json )"
                ]
            },
            {
                "name": "property",
                "type": "method",
                "module": "ue-core-object",
                "description": "Convert an object into a list of [key, value] pairs.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-object.js",
                "line": 118,
                "overloads": [],
                "example": [
                    "\n\n  var object    = \n  {\n      \"foo\"   : 1,\n      \n      \"bar\"   : 2\n  }\n\n  // [ [ \"foo\", 1 ], [ \"bar\", 2 ] ]\n  ue.pairs( object )"
                ]
            },
            {
                "name": "property",
                "type": "method",
                "module": "ue-core-object",
                "description": "Convert an object into a list of [key, value] pairs.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-object.js",
                "line": 154,
                "overloads": [],
                "example": [
                    "\n\n  var object    = \n  {\n      \"foo\"   : 1,\n      \n      \"bar\"   : 2\n  }\n\n  // [ [ \"foo\", 1 ], [ \"bar\", 2 ] ]\n  ue.pairs( object )"
                ]
            }
        ],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-object.js",
        "line": 3
    },
    {
        "name": "ue-core-string",
        "modules": [],
        "methods": [
            {
                "name": "len",
                "type": "method",
                "module": "ue-core-string",
                "description": "Returns the number of characters that are in a string, using an integer.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 31,
                "overloads": [],
                "example": [
                    "\n     \n  // 7\n  ue.len( 'foo bar' );"
                ]
            },
            {
                "name": "lower",
                "type": "method",
                "module": "ue-core-string",
                "description": "Make a string's all characters lowercase.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 48,
                "overloads": [],
                "example": [
                    "\n     \n  // foo bar\n  ue.lower( 'FoO BaR' );"
                ]
            },
            {
                "name": "upper",
                "type": "method",
                "module": "ue-core-string",
                "description": "Make a string's all characters uppercase.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 65,
                "overloads": [],
                "example": [
                    "\n     \n  // FOO BAR\n  ue.upper( 'FoO BaR' );"
                ]
            },
            {
                "name": "ucfirst",
                "type": "method",
                "module": "ue-core-string",
                "description": "Make a string's first character uppercase.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 82,
                "overloads": [],
                "example": [
                    "\n     \n  // Foo bar\n  ue.ucfirst( 'foo bar' );"
                ]
            },
            {
                "name": "uclast",
                "type": "method",
                "module": "ue-core-string",
                "description": "Make a string's last character uppercase.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 99,
                "overloads": [],
                "example": [
                    "\n     \n  // foo baR\n  ue.uclast( 'foo bar' );"
                ]
            },
            {
                "name": "lcfirst",
                "type": "method",
                "module": "ue-core-string",
                "description": "Make a string's first character lowercase.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 116,
                "overloads": [],
                "example": [
                    "\n     \n  // fOO BAR\n  ue.lcfirst( 'FOO BAR' );"
                ]
            },
            {
                "name": "lclast",
                "type": "method",
                "module": "ue-core-string",
                "description": "Make a string's last character lowercase.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 133,
                "overloads": [],
                "example": [
                    "\n     \n  // FOO BAr\n  ue.lcfirst( 'FOO BAR' );"
                ]
            },
            {
                "name": "camelCase",
                "type": "method",
                "module": "ue-core-string",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 150,
                "overloads": [],
                "example": [
                    "\n      \n   // fooBar\n   ue.camelCase( 'foo bar' );"
                ]
            },
            {
                "name": "ltrim",
                "type": "method",
                "module": "ue-core-string",
                "description": "Strip whitespace (or other characters set by second parameter) from the beginning of a string.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 170,
                "overloads": [],
                "example": [
                    "\n     \n  // foo\n  ue.ltrim( '    foo' );"
                ]
            },
            {
                "name": "rtrim",
                "type": "method",
                "module": "ue-core-string",
                "description": "Strip whitespace (or other characters set by second parameter) from the end of a string.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 188,
                "overloads": [],
                "example": [
                    "\n     \n  // foo\n  ue.rtrim( 'foo   ' );"
                ]
            },
            {
                "name": "trim",
                "type": "method",
                "module": "ue-core-string",
                "description": "Strip whitespace (or other characters set by second parameter) from the beginning and end of a string.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 206,
                "overloads": [],
                "example": [
                    "\n     \n  // foo\n  ue.trim( '   foo   ' );"
                ]
            },
            {
                "name": "repeat",
                "type": "method",
                "module": "ue-core-string",
                "description": "Repeat a string __N__ times.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 224,
                "overloads": [],
                "example": [
                    "\n     \n  // foofoo\n  ue.repeat( 'foo', 2 );\n \n  // foobarfoo\n  ue.repeat( 'foo', 2, 'bar' );"
                ]
            },
            {
                "name": "lpad",
                "type": "method",
                "module": "ue-core-string",
                "description": "Pad a string from the beginning to a certain length with another string.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 254,
                "overloads": [],
                "example": [
                    "\n     \n  // ###foo\n  ue.lpad( 'foo', 6, '#' );"
                ]
            },
            {
                "name": "rpad",
                "type": "method",
                "module": "ue-core-string",
                "description": "Pad a string from the end to a certain length with another string.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 280,
                "overloads": [],
                "example": [
                    "\n     \n  // ###foo\n  ue.lpad( 'foo', 6, '#' );"
                ]
            },
            {
                "name": "pad",
                "type": "method",
                "module": "ue-core-string",
                "description": "Pad a string from the beginning and end to a certain length with another string.",
                "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
                "line": 304,
                "overloads": [],
                "example": [
                    "\n     \n  // ###foo\n  ue.lpad( 'foo', 6, '#' );"
                ]
            }
        ],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-string.js",
        "line": 3
    },
    {
        "name": "ue-core-var",
        "modules": [],
        "methods": [],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/core/ue-core-var.js",
        "line": 3
    },
    {
        "name": "ue-script",
        "modules": [],
        "methods": [],
        "file": "/Users/ruben.lopez/Enviroment/deploy/ueScript/src/ue-script.js",
        "line": 13
    }
];

    var diskModule  = function( module, context, opts, parent )
    {
        if( !this instanceof diskModule )
            return new diskModule( module, opts );

        var self            = this,

            throttle        = null,

            radius          = 0,

            children        = [],

            name            = 'NO_NAME',

            g_modules, g_methods,

            disk, circle, text,

            options         =
            {
                radius          : 80,

                drawMethods     : true,

                drawModules     : true,

                animation       : 
                {
                    duration    : 200
                },

                fill            : '#CE573C',

                color           : '#EFEFEF',

                stroke          : shaden( '#CE573C', -5 ),

                position        : { x : 256, y : 350 }
            },

            clearMethods    = this.clearMethods     = function()
            {
                /*disk
                    .selectAll( '[data-method]' )
                    .remove();*/
            },

            drawMethods     = this.drawMethods      = function( methods, opts )
            {
                if( !options.drawMethods )
                    return false;

                var i           = 0;

                    opts        = getOptions( opts );

                    g_methods   = disk
                        .group()
                        .attr( 'methods', methods.length );

                for( clearMethods(); i < methods.length; i ++ )
                {
                    g_methods
                        .circle
                        ( 
                            Math.cos( i / methods.length * Math.PI * 2 + Math.PI * 0.25 ) * opts.radius * 1.2,

                            Math.sin( i / methods.length * Math.PI * 2 + Math.PI * 0.25 ) * opts.radius * 1.2, 1 
                        )
                        .attr
                        ({
                            'data-method'       : methods[ i ].name
                        })
                        .animate
                        ({
                            r       : opts.radius * 0.1,

                            fill    : '#5F8CD1'

                        }, options.animation.duration );
                };
            },

            clearModules    = this.clearModules     = function()
            {
                /*disk
                    .selectAll( '[data-module]' )
                    .remove();*/
            },

            drawModules     = this.drawModules      = function( modules, opts )
            {
                if( !options.drawModules )
                    return false;

                /*if( parent )
                    parent.setOption( 'radius', calcRadius() ); */                     

                var i           = 0;

                    opts        = getOptions( opts );

                for( clearModules(); i < module.modules.length; i ++ )
                {
                    children.push( new diskModule( module.modules[ i ], disk, $.extend( opts, 
                    { 
                        position    :
                        {
                            x : module.modules.length == 1 ? 0 : Math.cos( i / module.modules.length * Math.PI * 2 ) * calcRadius( opts.raidus ),

                            y : module.modules.length == 1 ? 0 : Math.sin( i / module.modules.length * Math.PI * 2 ) * calcRadius( opts.raidus )
                        }
                    }), self ));
                };
            },

            draw            = this.draw         = function( opts )
            {
                if( !this._intialize )
                    return (function(_){_&& clearTimeout(_);throttle=setTimeout(function(){draw()},10)})(throttle);

                var i           = 0;

                    opts        = getOptions( opts );

                circle          = context
                    .circle( 0, 0, 0 )
                    .attr
                    ({
                        'fill'            : '#FFFFFF',

                        'strokeWidth'     : 5
                    })
                    .animate
                    ({
                        r       : calcRadius( opts.radius ),

                        fill    : hasModules() ? '#FFFFFF' : opts.fill,

                        stroke  : opts.stroke

                    }, options.animation.duration );

                text    = context
                    .text( 0, 0, name )
                    .attr
                    ({
                        'fill'          : opts.color,

                        "text-anchor"   : 'middle',

                        'viewBox'       : '256'
                    });

                disk    = context
                    .group( circle, text )
                    .attr
                    ({
                        'data-module'   : name,

                        'transform'     : 'translate( ' + opts.position.x + ', ' + opts.position.y + ' )'
                    });

                drawMethods( module.methods );

                drawModules( module.modules );
            },

            setOption       = this.setOption = function( key, value )
            {
                switch( key )
                {
                    case 'radius':
                        draw({ radius   : value });
                    break;
                    case 'color':
                        draw({ color    : value });
                    break;
                    case 'fill':
                        draw({ radius   : value });
                    break;
                    case 'stroke':
                        draw({ stroke   : value });
                    break;
                    case 'position':
                        draw({ position : value });
                    break;
                }

                options[ key ] = value;
            },

            setOptions      = function( opts )
            {
                for( var opt in opts = $.extend({}, options, opts ) )
                {
                    setOption( opt, opts[ opt ] );
                }
            },

            getOptions      = function( merge )
            {
                return merge ? $.extend( {}, options, merge ) : options;
            },

            calcRadius      = function( radius )
            {
                radius      = radius || options.radius;

                return radius + Math.pow( module.modules.length + 1, 2 ) / 32 * radius;

                /*return 80 + Math.pow( ( function( modules, sum )
                {
                    for( var i = 0; i < modules.length; i ++ )
                        sum = arguments.callee( modules[ i ].modules, sum );
                    return sum += modules.length;
                })( module.modules, 1 ), 2 ) / 32 * 80;*/
            },

            hasModules      = function()
            {
                return module.modules.length != 0;
            },

            init            = function()
            {
                this._intialize     = false;

                self.parent = parent;

                name        = module.name;

                setOptions( opts );

                this._intialize     = true;
            };

            init();
    };

    var shaden      = function( color, percent )
        {
            var num     = parseInt( color.replace( '#', '' ), 16 ),
            
                amt     = Math.round( 2.55 * percent ),
            
                R       = ( num >> 16 ) + amt,
                
                G       = ( num >> 8 & 0x00FF ) + amt,
                
                B       = ( num & 0x0000FF ) + amt;

            return '#' + ( 0x1000000 + 
                        ( R < 255 ? R < 1 ? 0 : R : 255 ) * 0x10000 + 
                        ( G < 255 ? G < 1 ? 0 : G : 255 ) * 0x100 + 
                        ( B < 255 ? B < 1 ? 0 : B : 255 ) ).toString( 16 ).slice( 1 )
        }

        /*diskModule  = function( module, position, context )
        {
            var HAS_MODULES     = module.modules.length != 0,

                radio           = ( HAS_MODULES ? 2 : module.methods.length / 50 ) * 128 + 64,

                circle          = context
                    .circle( 0, 0, radio )
                    .attr
                    ({
                        'fill'            : HAS_MODULES ?  "#FFFFFF" : "#CE573C",

                        'stroke'          : shaden( '#CE573C', -5 ),

                        'strokeWidth'     : 5,

                    }),

                text    = context
                    .text( 0, 0, module.name )
                    .attr
                    ({
                        "text-anchor" : 'middle',


                        'viewBox'     : '256',

                        'fill'        : HAS_MODULES ? '#CCCCCC' : '#FFFFFF'
                    }),

                disk    = context
                    .group( circle, text )
                    .attr
                    ({
                        'transform'     : 'translate( ' + position.x + ', ' + position.y + ' )',

                        'data-module'   : module.name
                    });

                return disk;
        },*/

        /*if( typeof module == 'string' )
                module = findModule( module );

            var position        = 
            ({
                x : Math.cos( key / json.length * Math.PI * 2 ) * 256 + 256,

                y : Math.sin( key / json.length * Math.PI * 2 ) * 256 + 256
            });

            drawDiskModules( module.modules );

            diskModule( module, position, Snap( '#diagram' ) );*/

        drawDiskModules     = function( modules )
        {
            $.each( modules, function( key, module )
            {
                if( typeof module == 'string' )
                    module = findModule( module );

                var position        = 
                ({
                    x : Math.cos( key / json.length * Math.PI * 2 ) * 256 + 256,

                    y : Math.sin( key / json.length * Math.PI * 2 ) * 256 + 256
                });

                drawDiskModules( module.modules );

                diskModule( module, position, Snap( '#diagram' ) );
            });
        },

        findModule      = function( module_name )
        {
            return $.grep( json, function(n, i)
            {
                return n.name == module_name;
            });
        },

        getTree         = function( data )
        {
            var tree        = data.slice( 0 );

            for( var i = 0; i < tree.length; i ++ )
            {
                for( var j = 0; tree[ i ] && j < tree[ i ][ 'modules' ][ 'length' ]; j ++ )
                {
                    (function( name )
                    {
                        for( var match, r = 0; r < tree.length; r ++ )
                            if( tree[ r ] && ( match = tree[ r ] )[ 'name' ] == name )
                            {
                                tree[ r ] = null;

                                tree[ i ][ 'modules' ][ j ] = match;
                            }
                    })( tree[ i ][ 'modules' ][ j ] );
                };
            };

            for ( var i = 0; i < tree.length; i ++ ) 
            {
                if ( tree[ i ] == null) 
                {         
                    tree.splice( i, 1 );

                    i --;
                }
            };

            return tree;
        }

    $( document ).ready( function()
    {
        var tree = getTree( json );

        new diskModule( tree[ 0 ], Snap( '#diagram' ));

        console.log( tree );

        /*$.each( getTree( json ), function( key, module )
        {
            new diskModule( module, Snap( '#diagram' ),
            {
                ratio   : 50
            });
        });*/

        
    });
})( jQuery )

