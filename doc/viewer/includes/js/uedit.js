/*! uedit-framework-js - v0.0.1 - 2014-09-15 */



// Filename: src/ue-core.js

(function( global )
{
    
    var 

    // Versión de uEdit

    version             = "@VERSION",

    rtrim               = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    rmsPrefix           = /^-ms-/,

    rnotwhite           = /\S+/g,

    rsingleTag          = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

    pnum                = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source,

    isArraylike,
    
    // Función principal de uEdit

    uEdit               = global[ "uEdit" ] || function( selector, context ) 
    {
        return new uEdit.fn( selector, context );
    };

    uEdit.extend        = function() 
    {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) 
        {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && typeof target !== "function" ) 
        {
            target = {};
        }

        // Extend uEdit itself if only one argument is passed
        if ( i === length ) 
        {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) 
        {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) 
            {
                // Extend the base object
                for ( name in options ) 
                {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) 
                    {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( uEdit.isPlainObject(copy) ||
                        (copyIsArray = uEdit.isArray(copy)) ) ) 
                    {

                        if ( copyIsArray ) 
                        {
                            copyIsArray = false;
                            clone = src && uEdit.isArray(src) ? src : [];

                        } 
                        else 
                        {
                            clone = src && uEdit.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = uEdit.extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } 
                    else if ( copy !== undefined ) 
                    {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    uEdit.extend
    ({
        expando                 : "uEdit" + ( version + Math.random() ).replace( /\D/g, "" ),

        isReady                 : true,

        support                 : {},

        globalEval              : function( code ) 
        {
            var script = document.createElement( "script" );

            script.text = code;
            document.head.appendChild( script ).parentNode.removeChild( script );
        },

        nodeName                : function( elem, name ) 
        {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        acceptData              : function( owner ) 
        {
            return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
        },

        access                  : function( elems, fn, key, value, chainable, emptyGet, raw )
        {
            var i = 0,

                len = elems.length,

                bulk = key == null;

            // Sets many values
            if ( uEdit.type( key ) === "object" ) {
                chainable = true;
                for ( i in key ) {
                    uEdit.access( elems, fn, i, key[i], true, emptyGet, raw );
                }

            // Sets one value
            } else if ( value !== undefined ) {
                chainable = true;

                if ( !uEdit.isFunction( value ) ) {
                    raw = true;
                }

                if ( bulk ) {
                    // Bulk operations run against the entire set
                    if ( raw ) {
                        fn.call( elems, value );
                        fn = null;

                    // ...except when executing function values
                    } else {
                        bulk = fn;
                        fn = function( elem, key, value ) {
                            return bulk.call( uEdit( elem ), value );
                        };
                    }
                }

                if ( fn ) {
                    for ( ; i < len; i++ ) {
                        fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
                    }
                }
            }

            return chainable ?
                elems :

                // Gets
                bulk ?
                    fn.call( elems ) :
                    len ? fn( elems[0], key ) : emptyGet;
        },

        parseHTML                   : function( data, context, keepScripts ) 
        {
            if ( !data || typeof data !== "string" ) {
                return null;
            }
            if ( typeof context === "boolean" ) {
                keepScripts = context;
                context = false;
            }
            context = context || document;

            var parsed = rsingleTag.exec( data ),
                scripts = !keepScripts && [];

            // Single tag
            if ( parsed ) {
                return [ context.createElement( parsed[1] ) ];
            }

            parsed = uEdit.buildFragment( [ data ], context, scripts );

            if ( scripts && scripts.length ) {
                uEdit( scripts ).remove();
            }

            return uEdit.merge( [], parsed.childNodes );
        },

        // ueSelector implement

        find                    : function( selector, context, results )
        {
            return uEdit.notYet( "uEdit.find",      global[ "ueSelector" ],                                                 [ selector, context, results || new uEdit.fn() ], this );
        },

        unique                  : function()
        {
            return uEdit.notYet( "uEdit.unique",    global[ "ueSelector" ] ? global[ "ueSelector" ].uniqueSort  : null,     arguments, this );
        },

        text                    : function()
        {
            return uEdit.notYet( "uEdit.text",      global[ "ueSelector" ] ? global[ "ueSelector" ].getText     : null,     arguments, this );
        },

        isXMLDoc                : function()
        {
            return uEdit.notYet( "uEdit.isXMLDoc",  global[ "ueSelector" ] ? global[ "ueSelector" ].isXML       : null,     arguments, this );
        },

        contains                : function()
        {
            return uEdit.notYet( "uEdit.contains",  global[ "ueSelector" ] ? global[ "ueSelector" ].contains    : null,     arguments, this );
        },

        vars                    : 
        {
            rnotwhite       : rnotwhite,

            rsingleTag      : rsingleTag,

            pnum            : pnum
        }
    });
    

    uEdit.isArraylike = isArraylike = function( obj ) 
    {
        var length = obj.length,
            type = uEdit.type( obj );

        if ( type === "function" || uEdit.isWindow( obj ) ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }

    global.ue = global.uEdit = uEdit;

})( window );;

// Filename: src/ue-core-fn.js

(function( uEdit, rsingleTag )
{ 
    var rquickExpr      = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        rootContext;

    uEdit.fn            = function( selector, context ) 
    {
        var match, elem;

        if( !( this instanceof uEdit.fn ) )
        {
            return ( uEdit.fn.prototype[ selector ] = context );
        }

        // HANDLE: ue(""), $(null), $(undefined), $(false)
        if ( !selector ) 
        {
            return this;
        }

        // Handle HTML strings
        if ( typeof selector === "string" ) 
        {
            if ( selector[0] === "<" &&
                selector[ selector.length - 1 ] === ">" &&
                selector.length >= 3 ) 
            {

                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [ null, selector, null ];

            } 
            else 
            {
                match = rquickExpr.exec( selector );
            }

            // Match html or make sure no context is specified for #id
            if ( match && (match[1] || !context) ) 
            {

                // HANDLE: ue(html) -> $(array)
                if ( match[1] ) 
                {
                    context = context instanceof uEdit ? context[0] : context;

                    // Option to run scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    uEdit.merge( this, uEdit.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ) );

                    // HANDLE: ue(html, props)
                    if ( rsingleTag.test( match[1] ) && uEdit.isPlainObject( context ) ) 
                    {
                        for ( match in context ) {
                            // Properties of context are called as methods if possible
                            if ( uEdit.isFunction( this[ match ] ) ) {
                                this[ match ]( context[ match ] );

                            // ...and otherwise set as attributes
                            } else {
                                this.attr( match, context[ match ] );
                            }
                        }
                    }

                    return this;

                // HANDLE: ue(#id)
                } 
                else 
                {
                    elem = document.getElementById( match[2] );

                    // Support: Blackberry 4.6
                    // gEBID returns nodes no longer in the document (#6963)
                    if ( elem && elem.parentNode ) {
                        // Inject the element directly into the uEdit object
                        this.length = 1;
                        this[0] = elem;
                    }

                    this.context = document;
                    this.selector = selector;
                    return this;
                }

            // HANDLE: ue(expr, $(...))
            } 
            else if ( !context || context.uEdit ) 
            {
                return ( context || rootContext ).find( selector );

            // HANDLE: ue(expr, context)
            // (which is just equivalent to: $(context).find(expr)
            } 
            else 
            {
                return this.constructor( context ).find( selector );
            }

        // HANDLE: ue(DOMElement)
        } 
        else if ( selector.nodeType ) 
        {
            this.context = this[0] = selector;
            this.length = 1;
            return this;

        // HANDLE: ue(function)
        // Shortcut for document ready
        } 
        else if ( uEdit.isFunction( selector ) ) 
        {
            return typeof rootContext.ready !== "undefined" ?
                rootContext.ready( selector ) :
                // Execute immediately if ready is not present
                selector( uEdit );
        }
        else if( uEdit.isWindow( selector ) )
        {
            return this.push( selector );
        }

        if ( selector.selector !== undefined ) 
        {
            this.selector = selector.selector;
            this.context = selector.context;
        }

        return ueSelector( selector, context, this );
    };

    uEdit.extend
    (
        uEdit.fn,

        uEdit,
    {
        prototype       : [],

        extend          : function( source )
        {
            return uEdit.extend( uEdit.fn.prototype, source );;
        }
    });

    uEdit.fn.extend
    ({
        constructor     : uEdit.fn,
        // Selector utilizado para recoger los elementos internos de la matriz

        selector        : "",
        
        // Numero de elementos recogidos

        length          : 0,

        setRootContext  : function( context )
        {
            rootContext = context.length ? context : uEdit( context );
        },

        // Convierte el objeto actual en una matriz nativa de JavaScript

        toArray         : function() 
        {
            return uEdit.slice.call( this );
        },

        // Devuelve en base al indice untroducido el elemento que corresponda, 
        // si se intruduce negativo lo de vuelve de forma inversa

        get             : function( num ) 
        {
            return num !== undefined ?

            ( num < 0 ? this[ num + this.length ] : this[ num ] ) :
                
            uEdit.slice.call( this );
        },

        // Método que permite añadir elementos a la matriz especificando el padre de cada uno de ellos,
        // indispensable para futuras funciones tales como parent() o children()

        pushStack: function( elems, copy ) 
        {
            var ret         = copy || elems instanceof this.constructor ? elems : uEdit.merge( new this.constructor(), elems );

            ret.prevObject  = this;

            ret.context     = this.context;

            return ret;
        },

        // Ejecuta para cada uno de los elementos una funcion enviada por parametro

        each            : function( callback, args ) 
        {
            return uEdit.each( this, callback, args );
        },

        // Genera un array mediante una functión condicional para cada uno de los elementos 
        // estableciendo false de retorno como forma excluir elementos

        map             : function( callback ) 
        {
            return this.pushStack
            ( 
                uEdit.map( this, function( elem, i ) 
                {
                    return callback.call( elem, i, elem );
                })
            );
        },

        slice           : function() 
        {
            return this.pushStack( uEdit.slice.apply( this, arguments ) );
        },

        first           : function() 
        {
            return this.eq( 0 );
        },

        last            : function() 
        {
            return this.eq( -1 );
        },

        eq              : function( i ) 
        {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
        },

        end             : function() 
        {
            return this.prevObject || this.constructor(null);
        },

        find: function( selector ) 
        {
            var i,
                len     = this.length,
                ret     = [],
                self    = this;

            if ( typeof selector !== "string" ) 
            {
                return this.pushStack( uEdit( selector ).filter( function() 
                {
                    for ( i = 0; i < len; i++ ) 
                    {
                        if ( uEdit.contains( self[ i ], this ) ) 
                        {
                            return true;
                        }
                    }
                }));
            }

            for ( i = 0; i < len; i++ ) 
            {
                uEdit.find( selector, self[ i ], ret );
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack( len > 1 ? uEdit.unique( ret ) : ret );

            ret.selector = this.selector ? this.selector + " " + selector : selector;

            return ret;
        },

        filter: function( selector ) 
        {
            return this.pushStack( winnow(this, selector || [], false) );
        },

        not: function( selector ) 
        {
            return this.pushStack( winnow(this, selector || [], true) );
        },

        /*is: function( selector ) 
        {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test( selector ) ?
                    uEdit( selector ) :
                    selector || [],
                false
            ).length;
        }*/
    }).setRootContext( document );

})( uEdit, uEdit.vars.rsingleTag );;

// Filename: src/ue-core-type.js

(function( uEdit )
{
    uEdit.extend
    ({
        instanceOf              : function( obj, _class )
        {
            return obj instanceof ( _class ); 
        },

        hasClass                : function( obj, _class )
        {
            return obj.constructor.uuid.indexOf( _class.uuid ); // TODO
        },

        stype                   : function( value )
        {
            var strType = toString.call( value ).slice( 8, -1 );

            //console.log( typeof value, toString.call( value ), toString.call( value ).slice( 8, -1 ) );

            return strType.toLowerCase();
        },

        ctype                   : function( value )
        {
            if ( ( value === null ) || ( value === undefined ) )
                return value;
            
            return value.constructor;
        },

        type                    : function( value )
        {
            return uEdit.stype( value );
        },                     

        to                      : function( value, type )
        {
            switch( type )
            {
                case 'array':

                    if( value && value.length )
                        return value;

                    return [ value ];
            }

            return value;
        },

        of                      : function( value, type ) 
        {
            return uEdit.ctype( value ) === type;
        },

        is                      : function( value, type )
        {
            var typer = ( uEdit.of( type, String ) ) ? uEdit.stype : uEdit.ctype;

            return ( typer( value ) === type );
        },

        any                     : function( value, types ) 
        {
            if ( !this.is( types, Array ) ) 
            {
                throw ("Second argument to .any() should be array");
            }

            for ( var i = 0; i < types.length; i++ ) 
            {
              if ( this.is( value, types[ i ] ) ) 
                return true;
            }

            return false;
        },

        typeOf                  : function( value )
        {

            return this.of( value );
        },

        isType                  : function( value, type )
        {
            return this.is( value, type );
        },

        isDOMElement            : function( value )
        {
            return this.is( value, 'DOMElement' );
        },

        isArguments             : function( value )
        {
            return this.is( value, 'arguments' );
        },

        isFunction              : function( value )
        {
            return this.is( value, Function );
        },

        isObject                : function( value )
        {
            return this.is( value, 'object' );
        },

        isArray                 : function( value )
        {
            return this.is( value, 'array' );
        },

        isNumber                : function( value )
        {
            return this.is( value, 'number' );
        },

        isInteger               : function( value )
        {
            return this.is( value, 'number' ) && ( value + '' ).indexOf( '.' ) === -1;
        },

        isFloat                 : function( value )
        {
            return this.is( value, 'number' ) && ( value + '' ).indexOf( '.' ) !== -1 ;
        },

        isString                : function( value )
        {
            return this.is( value, 'string' );
        },

        isBoolean               : function( value )
        {
            return this.is( value, 'boolean' );
        },

        isRegExp                : function( value )
        {
            return this.is( value, 'regexp' );
        },

        isNullOrUndefined       : function( value )
        {
            return value === null || value === undefined;
        },

        isUndefined             : function( value )
        {
            return value === undefined;
        },

        isNull                  : function( value )
        {
            return value === null;
        },

        isWindow                : function( obj ) 
        {
            return obj != null && obj === obj.window;
        },

        isNumeric: function( obj ) 
        {
       
            return !uEdit.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        },

        isPlainObject: function( obj ) 
        {
        
            if ( uEdit.type( obj ) !== "object" || obj.nodeType || uEdit.isWindow( obj ) ) 
            {
                return false;
            }

            if ( obj.constructor && !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) 
            {
                return false;
            }

            return true;
        },

        isEmptyObject: function( obj ) 
        {
            var name;

            for ( name in obj ) 
            {
                return false;
            }
            
            return true;
        },

        isNullOrUnd             : function( value )
        {
            return value === null || value === undefined;
        },

        isUnd                   : function( value )
        {
            return value === null;
        },

        isArg                   : function( value )
        {
            return this.isArguments( value );
        },

        isFn                    : function( value )
        {
            return this.isFunction( value );
        },

        isObj                   : function( value )
        {
            return this.isFunction( value );
        },

        isArr                   : function( value )
        {
            return this.isArray( value );
        },

        isNum                   : function( value )
        {
            return this.isNumber( value );
        },

        isInt                   : function( value )
        {
            return this.isInteger( value );
        },

        isFlt                   : function( value )
        {
            return this.isFloat( value );
        },

        isStr                   : function( value )
        {
            return this.isString( value );
        },

        isBol                   : function( value )
        {
            return this.isBoolean( value );
        },

        isReg                   : function( value )
        {
            return this.isRegExp( value );
        },

        toArray                 : function( value )
        {
            return this.to( value, 'array' );
        }
    });
    

})( uEdit );;

// Filename: src/ue-core-string.js

(function( uEdit )
{
    var rtrim       = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        rdashAlpha  = /-([\da-z])/gi;
    
    uEdit.extend
    ({
        len                     : function( str )
        {
            return str.length || 0;
        },

        lower                   : function( str )
        {
            return str.toLowerCase();
        },

        upper                   : function( str )
        {
            return str.toUpperCase();
        },

        ucfirst                 : function( str )
        {
            return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
        },

        lcfirst                 : function( str )
        {
            return str.charAt( 0 ).toLowerCase() + str.slice( 1 );
        },

        uclast                  : function( str )
        {
            return str.substring( 0, str.length - 1 ) + str.charAt( str.length - 1 ).toUpperCase();
        },

        lclast                  : function( str )
        {
            return str.substring( 0, str.length - 1 ) + str.charAt( str.length - 1 ).toLowerCase();
        },

        camelCase               : function( str ) 
        {
            return str.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, function( all, letter ) 
            {
                return letter.toUpperCase();
            });
        },

        trim                    : function( str )
        {
            return str == null ?
                "" :
                ( str + "" ).replace( rtrim, "" );
        },

        repeat                  : function( str, num, glue )
        {
            if( !glue && str.repeat )
                return str.repeat( num );

            for( var i = 1, g = glue || '', s = str; i < num; i ++ )
                s += g + str;

            return s;
        },

        lpad                    : function( len, pad ) 
        {
            var str = this;
            while (str.length < len)
                str = pad + str;
            return str;
        },

        rpad                    : function( len, pad ) 
        {
            var str = this;
            while (str.length < len)
                str = str + pad;
            return str;
        },

        hash                    : function( len, chars )
        {
                chars   = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var strlen  = chars.length,
                hash    = '', i = 0;
                len     = len || 10;
            
            for ( ; i < len; i ++ ) 
            {
                hash += chars.charAt( $.rand( 0, strlen - 1 ) );
            }

            return hash;
        },

        indexOf                 : function( a, o, i )
        {
            i = i || Math.max( 0, a.length + i );

            
            for ( var l = a.length; i < l; i++ ) 
            {
                if ( a[ i ] === o )
                    return i;
            }

            return -1;
        },

        indexOfBy               : function( a, fn, i )
        {
            i = i || Math.max( 0, a.length + i );

            
            for ( var l = a.length; i < l; i++ ) 
            {
                if( fn.call( a, i, a[ i ] ) === true );
                    return i;
            }

            return -1;
        },

        format                  : function( format ) 
        {
            var returnStr = '';

            var replace = Date.replaceChars;

            for ( var i = 0; i < format.length; i++ ) 
            {       

                var curChar = format.charAt( i );

                if ( i - 1 >= 0 && format.charAt(i - 1) == "\\" ) 
                {
                    returnStr += curChar;
                }
                else if ( replace[ curChar ] ) 
                {
                    returnStr += replace[ curChar ].call( this );
                } 
                else if ( curChar != "\\" )
                {
                    returnStr += curChar;
                }
            }

            return returnStr;
        }
    });
    

})( uEdit );;

// Filename: src/ue-core-number.js

(function( uEdit )
{
    uEdit.extend
    ({
        rand                    : function( min, max )
        {
            var _max = max || 0,
        
                _min = (  typeof min === 'number' ? min : max ) || 0;
        
            if( _min + _max <= 0 )
               return Math.floor( Math.random() * Math.pow( 10, 10 ) );
            
            max = Math.max( _max, _min );

            min = Math.min( _max, _min );

            return Math.floor( Math.random() * ( max - min )  + min ) + 1;
        }
    });
    

})( uEdit );;

// Filename: src/ue-core-array.js

(function( uEdit )
{
    var arr         = [];

    uEdit.extend
    ({
        slice                   : function( arr, start, index )
        {
            return arr.slice( start, index );
        },

        splice                  : function( arr )
        {
            return arr.splice.apply( arr, Array.prototype.slice.call( arguments, 1 ) );
        },

        concat                  : arr.concat    || function()
        {

        },

        sort                    : arr.sort      || function()
        {

        },

        indexOf                 : arr.indexOf   || function()
        {

        },

        inArray                 : function( elem, arr, i ) 
        {
            return arr == null ? -1 : uEdit.indexOf.call( arr, elem, i );
        },

        push                    : function()
        {
            var source, i = 0, j,
                length  = arguments.length,
                target  = arguments[ i ++ ],
                cast    = function( arg )
                {
                    return uEdit.isArray( arg ) ? arg : [ arg ];
                };
                target  = cast( target );

            for(; i < length; i ++ )
            {
                source = cast( arguments[ i ] );
                for ( j = 0; j < source.length; j ++ ) 
                {   
                    target.push( source[ j ] );
                }
            }

            return target;
        },

        get                     : function( arr, num )
        {
            if( arr.length )
            {
                return num < 0 ? arr[ arr.length + num ] : arr[ num ];
            }
            else
            {
                return arr[ num ];
            }
        },

        walk                    : function( a, fn )
        {
            for ( var i = 0; i < a.length; i++ ) 
            {
                fn.call( a, i, a[ i ] );
            }

            return a;
        },

        merge                   : function( first, second )
        {
            var len = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < len; j++ ) 
            {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        },
    
        each                    : function( obj, callback, args ) 
        {
            var i       = 0,
                length  = obj.length,
                call    = function( fn, context, index )
                {
                    if( args )
                    {
                        return fn.apply( context, args );
                    }
                    else
                    {
                        return fn.call( context, index, context );              
                    }
                };

            if( uEdit.instanceOf( obj, Array ) )
            {
                for ( ; i < length; i++ )
                {
                    if ( call( callback, obj[ i ], i ) )
                    {
                        break;
                    }
                }
            }
            else
            {
                for ( i in obj )
                {
                    if ( call( callback, obj[ i ], i ) )
                    {
                        break;
                    }
                }
            }

            return obj;
        },

        grep: function( elems, callback, invert ) 
        {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            
            for ( ; i < length; i++ ) 
            {
                callbackInverse = !callback( elems[ i ], i );

                if ( callbackInverse !== callbackExpect ) 
                {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },

        map: function( elems, callback, arg ) 
        {
            var value,
                i = 0,
                length = elems.length,
                isArray = uEdit.isArraylike( elems ),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

            // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return uEdit.concat.apply( [], ret );
        },

        proxy: function( fn, context ) 
        {
            var tmp, args, proxy;

            if ( typeof context === "string" ) 
            {
                tmp = fn[ context ];
                context = fn;
                fn = tmp;
            }

            if ( !uEdit.isFunction( fn ) ) 
            {
                return undefined;
            }


            args = uEdit.slice.call( arguments, 2 );
            proxy = function() 
            {
                return fn.apply( context || this, args.concat( uEdit.slice.call( arguments ) ) );
            };

            
            proxy.guid = fn.guid = fn.guid || uEdit.guid++;

            return proxy;
        }
    });
    

})( uEdit );;

// Filename: src/ue-core-object.js

(function( uEdit )
{
    uEdit.extend
    ({
        makeArray               : function( arr, results ) 
        {
            var ret = results || [];

            if ( arr != null ) 
            {
                if ( isArraylike( Object(arr) ) ) 
                {
                    uEdit.merge( ret,
                        typeof arr === "string" ?
                        [ arr ] : arr
                    );
                } 
                else 
                {
                    push.call( ret, arr );
                }
            }

            return ret;
        }
    });
    

})( uEdit );;

// Filename: src/ue-core-support.js

(function( uEdit, support )
{
    // Manipulation Support 

    var fragment        = document.createDocumentFragment(),

        div             = fragment.appendChild( document.createElement( "div" ) ),
        
        input           = document.createElement( "input" );

    // Support: Safari<=5.1
    // Check state lost if the name is set (#11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)
    input.setAttribute( "type", "radio" );
    input.setAttribute( "checked", "checked" );
    input.setAttribute( "name", "t" );

    div.appendChild( input );

    // Support: Safari<=5.1, Android<4.2
    // Older WebKit doesn't clone checked state correctly in fragments
    support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

    // Support: IE<=11+
    // Make sure textarea (and checkbox) defaultValue is properly cloned
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

    // Css Support 

    var pixelPositionVal, boxSizingReliableVal,

        docElem         = document.documentElement,

        container       = document.createElement( "div" ),

        div             = document.createElement( "div" );

    if ( !div.style ) {
        return;
    }

    // Support: IE9-11+
    // Style of cloned element affects source element cloned (#8908)
    div.style.backgroundClip = "content-box";
    div.cloneNode( true ).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";

    container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
        "position:absolute";
    container.appendChild( div );

    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computePixelPositionAndBoxSizingReliable() {
        div.style.cssText =
            // Support: Firefox<29, Android 2.3
            // Vendor-prefix box-sizing
            "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
            "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
            "border:1px;padding:1px;width:4px;position:absolute";
        div.innerHTML = "";
        docElem.appendChild( container );

        var divStyle = window.getComputedStyle( div, null );
        pixelPositionVal = divStyle.top !== "1%";
        boxSizingReliableVal = divStyle.width === "4px";

        docElem.removeChild( container );
    }

    // Support: node.js jsdom
    // Don't assume that getComputedStyle is a property of the global object
    if ( window.getComputedStyle ) {
        uEdit.extend( support, {
            pixelPosition: function() {

                // This test is executed only once but we still do memoizing
                // since we can use the boxSizingReliable pre-computing.
                // No need to check if the test was already performed, though.
                computePixelPositionAndBoxSizingReliable();
                return pixelPositionVal;
            },
            boxSizingReliable: function() {
                if ( boxSizingReliableVal == null ) {
                    computePixelPositionAndBoxSizingReliable();
                }
                return boxSizingReliableVal;
            },
            reliableMarginRight: function() {

                // Support: Android 2.3
                // Check if div with explicit width and no margin-right incorrectly
                // gets computed margin-right based on width of container. (#3333)
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                // This support function is only executed once so no memoizing is needed.
                var ret,
                    marginDiv = div.appendChild( document.createElement( "div" ) );

                // Reset CSS: box-sizing; display; margin; border; padding
                marginDiv.style.cssText = div.style.cssText =
                    // Support: Firefox<29, Android 2.3
                    // Vendor-prefix box-sizing
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                    "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                docElem.appendChild( container );

                ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

                docElem.removeChild( container );

                return ret;
            }
        });
    }

})( uEdit, uEdit.support );;

// Filename: src/ue-core-tools.js

(function( uEdit )
{
    uEdit.extend
    ({
        debug                   : function( msg )
        {
            console.log( "[DEBUG] " + msg );
        },

        deprecate               : function( ref, message )
        {
            this.debug( "Deprecate: " + msg );

            return ref;
        },

        notYet                  : function( name, fn, args, context  )
        {
            var retVal;

            if( typeof fn === "function" )
            {
                retVal = fn.apply( context || this, args );
            }
            else
            {
                this.debug( "Method: " + name + " Not yet implemented" );
            }

            return retVal;
        },
        
        error                   : function( msg ) 
        {
            throw new Error( msg );
        },

        noop                    : function() 
        {

        },

        echo                    : function( str )
        {
            console.log( "ECHO: " + str );
        }

    });
    

})( uEdit );;

// Filename: src/ue-core-data.js

(function( uEdit, rnotwhite )
{
    function Data() {
        // Support: Android<4,
        // Old WebKit does not have Object.preventExtensions/freeze method,
        // return new empty object instead with no [[set]] accessor
        Object.defineProperty( this.cache = {}, 0, {
            get: function() {
                return {};
            }
        });

        this.expando = uEdit.expando + Math.random();
    }

    Data.uid = 1;
    Data.accepts = uEdit.acceptData;

    Data.prototype = {
        key: function( owner ) {
            // We can accept data for non-element nodes in modern browsers,
            // but we should not, see #8335.
            // Always return the key for a frozen object.
            if ( !Data.accepts( owner ) ) {
                return 0;
            }

            var descriptor = {},
                // Check if the owner object already has a cache key
                unlock = owner[ this.expando ];

            // If not, create one
            if ( !unlock ) {
                unlock = Data.uid++;

                // Secure it in a non-enumerable, non-writable property
                try {
                    descriptor[ this.expando ] = { value: unlock };
                    Object.defineProperties( owner, descriptor );

                // Support: Android<4
                // Fallback to a less secure definition
                } catch ( e ) {
                    descriptor[ this.expando ] = unlock;
                    uEdit.extend( owner, descriptor );
                }
            }

            // Ensure the cache object
            if ( !this.cache[ unlock ] ) {
                this.cache[ unlock ] = {};
            }

            return unlock;
        },
        set: function( owner, data, value ) {
            var prop,
                // There may be an unlock assigned to this node,
                // if there is no entry for this "owner", create one inline
                // and set the unlock as though an owner entry had always existed
                unlock = this.key( owner ),
                cache = this.cache[ unlock ];

            // Handle: [ owner, key, value ] args
            if ( typeof data === "string" ) {
                cache[ data ] = value;

            // Handle: [ owner, { properties } ] args
            } else {
                // Fresh assignments by object are shallow copied
                if ( uEdit.isEmptyObject( cache ) ) {
                    uEdit.extend( this.cache[ unlock ], data );
                // Otherwise, copy the properties one-by-one to the cache object
                } else {
                    for ( prop in data ) {
                        cache[ prop ] = data[ prop ];
                    }
                }
            }
            return cache;
        },
        get: function( owner, key ) {
            // Either a valid cache is found, or will be created.
            // New caches will be created and the unlock returned,
            // allowing direct access to the newly created
            // empty data object. A valid owner object must be provided.
            var cache = this.cache[ this.key( owner ) ];

            return key === undefined ?
                cache : cache[ key ];
        },
        access: function( owner, key, value ) {
            var stored;
            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if ( key === undefined ||
                    ((key && typeof key === "string") && value === undefined) ) {

                stored = this.get( owner, key );

                return stored !== undefined ?
                    stored : this.get( owner, uEdit.camelCase(key) );
            }

            // [*]When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set( owner, key, value );

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function( owner, key ) {
            var i, name, camel,
                unlock = this.key( owner ),
                cache = this.cache[ unlock ];

            if ( key === undefined ) {
                this.cache[ unlock ] = {};

            } else {
                // Support array or space separated string of keys
                if ( uEdit.isArray( key ) ) {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = key.concat( key.map( uEdit.camelCase ) );
                } else {
                    camel = uEdit.camelCase( key );
                    // Try the string as a key before any manipulation
                    if ( key in cache ) {
                        name = [ key, camel ];
                    } else {
                        // If a key with the spaces exists, use it.
                        // Otherwise, create an array by matching non-whitespace
                        name = camel;
                        name = name in cache ?
                            [ name ] : ( name.match( rnotwhite ) || [] );
                    }
                }

                i = name.length;
                while ( i-- ) {
                    delete cache[ name[ i ] ];
                }
            }
        },
        hasData: function( owner ) {
            return !uEdit.isEmptyObject(
                this.cache[ owner[ this.expando ] ] || {}
            );
        },
        discard: function( owner ) {
            if ( owner[ this.expando ] ) {
                delete this.cache[ owner[ this.expando ] ];
            }
        }
    };

    uEdit.data          = function()
    {
        return new Data();
    }

})( uEdit, uEdit.vars.rnotwhite );;

// Filename: src/ue-core-traversing.js

(function( uEdit, indexOf )
{
    var risSimple           = /^.[^:#\[\.,]*$/,

        rparentsprev        = /^(?:parents|prev(?:Until|All))/,
        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique    = 
        {
            children        : true,
            contents        : true,
            next            : true,
            prev            : true
        };

    // Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) 
    {
        if ( uEdit.isFunction( qualifier ) ) {
            return uEdit.grep( elements, function( elem, i ) {
                /* jshint -W018 */
                return !!qualifier.call( elem, i, elem ) !== not;
            });

        }

        if ( qualifier.nodeType ) {
            return uEdit.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            });

        }

        if ( typeof qualifier === "string" ) {
            if ( risSimple.test( qualifier ) ) {
                return uEdit.filter( qualifier, elements, not );
            }

            qualifier = uEdit.filter( qualifier, elements );
        }

        return uEdit.grep( elements, function( elem ) {
            return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
        });
    }

    uEdit.filter = function( expr, elems, not ) {
        var elem = elems[ 0 ];

        if ( not ) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 && elem.nodeType === 1 ?
            uEdit.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
            uEdit.find.matches( expr, uEdit.grep( elems, function( elem ) {
                return elem.nodeType === 1;
            }));
    };

    uEdit.extend
    ({
        dir: function( elem, dir, until ) 
        {
            var matched = [],
                truncate = until !== undefined;

            while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
                if ( elem.nodeType === 1 ) {
                    if ( truncate && uEdit( elem ).is( until ) ) {
                        break;
                    }
                    matched.push( elem );
                }
            }
            return matched;
        },

        sibling: function( n, elem ) 
        {
            var matched = [];

            for ( ; n; n = n.nextSibling ) {
                if ( n.nodeType === 1 && n !== elem ) {
                    matched.push( n );
                }
            }

            return matched;
        }
    });

    uEdit.fn.extend
    ({
        find: function( selector ) {
            var i,
                len = this.length,
                ret = [],
                self = this;

            if ( typeof selector !== "string" ) {
                return this.pushStack( uEdit( selector ).filter(function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( uEdit.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                }) );
            }

            for ( i = 0; i < len; i++ ) {
                uEdit.find( selector, self[ i ], ret );
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack( len > 1 ? uEdit.unique( ret ) : ret );
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function( selector ) {
            return this.pushStack( winnow(this, selector || [], false) );
        },
        not: function( selector ) {
            return this.pushStack( winnow(this, selector || [], true) );
        },
        is: function( selector ) {
            
            if( !uEdit.expr.match.needsContext )
            {
                uEdit.debug( 'ueSelector not implemented' );
            }

            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && uEdit.expr.match.needsContext.test( selector ) ?
                    uEdit( selector ) :
                    selector || [],
                false
            ).length;
        },

        has: function( target ) 
        {
            var targets = uEdit( target, this ),
                l = targets.length;

            return this.filter(function() {
                var i = 0;
                for ( ; i < l; i++ ) {
                    if ( uEdit.contains( this, targets[i] ) ) {
                        return true;
                    }
                }
            });
        },

        closest: function( selectors, context ) 
        {
             if( !uEdit.expr.match.needsContext )
            {
                uEdit.debug( 'ueSelector not implemented' );
            }
            
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = uEdit.expr.match.needsContext.test( selectors ) || typeof selectors !== "string" ?
                    uEdit( selectors, context || this.context ) :
                    0;

            for ( ; i < l; i++ ) 
            {
                for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
                    // Always skip document fragments
                    if ( cur.nodeType < 11 && (pos ?
                        pos.index(cur) > -1 :

                        // Don't pass non-elements to Sizzle
                        cur.nodeType === 1 &&
                            uEdit.find.matchesSelector(cur, selectors)) ) {

                        matched.push( cur );
                        break;
                    }
                }
            }

            return this.pushStack( matched.length > 1 ? uEdit.unique( matched ) : matched );
        },

        // Determine the position of an element within the set
        index: function( elem ) 
        {

            // No argument, return index in parent
            if ( !elem ) 
            {
                return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if ( typeof elem === "string" ) 
            {
                return indexOf.call( uEdit( elem ), this[ 0 ] );
            }

            // Locate the position of the desired element
            return indexOf.call( this,

                // If it receives a uEdit object, the first element is used
                elem.uEdit ? elem[ 0 ] : elem
            );
        },

        add: function( selector, context ) 
        {
            return this.pushStack(
                uEdit.unique(
                    uEdit.merge( this.get(), uEdit( selector, context ) )
                )
            );
        },

        addBack: function( selector ) 
        {
            return this.add( selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling( cur, dir ) 
    {
        while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
        return cur;
    }

    uEdit.each({
        parent: function( elem ) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
            return uEdit.dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, i, until ) {
            return uEdit.dir( elem, "parentNode", until );
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
            return uEdit.dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
            return uEdit.dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, i, until ) {
            return uEdit.dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, i, until ) {
            return uEdit.dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
            return uEdit.sibling( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
            return uEdit.sibling( elem.firstChild );
        },
        contents: function( elem ) {
            return elem.contentDocument || uEdit.merge( [], elem.childNodes );
        }
    }, function( name, fn ) {
        uEdit.fn[ name ] = function( until, selector ) {
            var matched = uEdit.map( this, fn, until );

            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }

            if ( selector && typeof selector === "string" ) {
                matched = uEdit.filter( selector, matched );
            }

            if ( this.length > 1 ) {
                // Remove duplicates
                if ( !guaranteedUnique[ name ] ) {
                    uEdit.unique( matched );
                }

                // Reverse order for parents* and prev-derivatives
                if ( rparentsprev.test( name ) ) {
                    matched.reverse();
                }
            }

            return this.pushStack( matched );
        };
    });

})( uEdit, uEdit.indexOf );;

// Filename: src/ue-core-manipulation.js

(function( uEdit, concat, push, access, support, dataPriv, dataUser )
{
    
    var 

    rcheckableType      = /^(?:checkbox|radio)$/i,

    rxhtmlTag           = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,

    rtagName            = /<([\w:]+)/,

    rhtml               = /<|&#?\w+;/,

    rnoInnerhtml        = /<(?:script|style|link)/i,

    rchecked            = /checked\s*(?:[^=]|=\s*.checked.)/i,

    rscriptType         = /^$|\/(?:java|ecma)script/i,

    rscriptTypeMasked   = /^true\/(.*)/,

    rcleanScript        = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

    wrapMap             = 
    {
        // Support: IE9
        option      : [ 1, "<select multiple='multiple'>", "</select>" ],

        thead       : [ 1, "<table>", "</table>" ],
        col         : [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr          : [ 2, "<table><tbody>", "</tbody></table>" ],
        td          : [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

        _default    : [ 0, "", "" ]
    };

    // Support: IE9
    wrapMap.optgroup    = wrapMap.option;

    wrapMap.tbody       = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;

    wrapMap.th          = wrapMap.td;

    // Support: 1.x compatibility
    // Manipulating tables requires a tbody
    function manipulationTarget( elem, content ) 
    {
        return uEdit.nodeName( elem, "table" ) &&
            uEdit.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

            elem.getElementsByTagName("tbody")[0] ||
                elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
            elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) 
    {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }

    function restoreScript( elem ) 
    {
        var match = rscriptTypeMasked.exec( elem.type );

        if ( match ) {
            elem.type = match[ 1 ];
        } else {
            elem.removeAttribute("type");
        }

        return elem;
    }

    // Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) 
    {
        var i = 0,
            l = elems.length;

        for ( ; i < l; i++ ) {
            dataPriv.set(
                elems[ i ], "globalEval", !refElements || dataPriv.get( refElements[ i ], "globalEval" )
            );
        }
    }

    function cloneCopyEvent( src, dest ) 
    {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

        if ( dest.nodeType !== 1 ) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if ( dataPriv.hasData( src ) ) {
            pdataOld = dataPriv.access( src );
            pdataCur = dataPriv.set( dest, pdataOld );
            events = pdataOld.events;

            if ( events ) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for ( type in events ) {
                    for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                        uEdit.event.add( dest, type, events[ type ][ i ] );
                    }
                }
            }
        }

        // 2. Copy user data
        if ( dataUser.hasData( src ) ) {
            udataOld = dataUser.access( src );
            udataCur = uEdit.extend( {}, udataOld );

            dataUser.set( dest, udataCur );
        }
    }

    function getAll( context, tag ) 
    {
        var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
                context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
                [];

        return tag === undefined || tag && uEdit.nodeName( context, tag ) ?
            uEdit.merge( [ context ], ret ) :
            ret;
    }

    // Fix IE bugs, see support tests
    function fixInput( src, dest ) 
    {
        var nodeName = dest.nodeName.toLowerCase();

        // Fails to persist the checked state of a cloned checkbox or radio button.
        if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
            dest.checked = src.checked;

        // Fails to return the selected option to the default selected state when cloning options
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
            dest.defaultValue = src.defaultValue;
        }
    }

    uEdit.extend
    ({
        clone: function( elem, dataAndEvents, deepDataAndEvents ) 
        {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode( true ),
                inPage = uEdit.contains( elem.ownerDocument, elem );

            // Fix IE cloning issues
            if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
                    !uEdit.isXMLDoc( elem ) ) {

                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll( clone );
                srcElements = getAll( elem );

                for ( i = 0, l = srcElements.length; i < l; i++ ) {
                    fixInput( srcElements[ i ], destElements[ i ] );
                }
            }

            // Copy the events from the original to the clone
            if ( dataAndEvents ) {
                if ( deepDataAndEvents ) {
                    srcElements = srcElements || getAll( elem );
                    destElements = destElements || getAll( clone );

                    for ( i = 0, l = srcElements.length; i < l; i++ ) {
                        cloneCopyEvent( srcElements[ i ], destElements[ i ] );
                    }
                } else {
                    cloneCopyEvent( elem, clone );
                }
            }

            // Preserve script evaluation history
            destElements = getAll( clone, "script" );
            if ( destElements.length > 0 ) {
                setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
            }

            // Return the cloned set
            return clone;
        },

        buildFragment: function( elems, context, scripts, selection ) 
        {
            var elem, tmp, tag, wrap, contains, j,
                fragment = context.createDocumentFragment(),
                nodes = [],
                i = 0,
                l = elems.length;

            for ( ; i < l; i++ ) {
                elem = elems[ i ];

                if ( elem || elem === 0 ) {

                    // Add nodes directly
                    if ( uEdit.type( elem ) === "object" ) {
                        // Support: QtWebKit, PhantomJS
                        // push.apply(_, arraylike) throws on ancient WebKit
                        uEdit.merge( nodes, elem.nodeType ? [ elem ] : elem );

                    // Convert non-html into a text node
                    } else if ( !rhtml.test( elem ) ) {
                        nodes.push( context.createTextNode( elem ) );

                    // Convert html into DOM nodes
                    } else {
                        tmp = tmp || fragment.appendChild( context.createElement("div") );

                        // Deserialize a standard representation
                        tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                        wrap = wrapMap[ tag ] || wrapMap._default;
                        tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

                        // Descend through wrappers to the right content
                        j = wrap[ 0 ];
                        while ( j-- ) {
                            tmp = tmp.lastChild;
                        }

                        // Support: QtWebKit, PhantomJS
                        // push.apply(_, arraylike) throws on ancient WebKit
                        uEdit.merge( nodes, tmp.childNodes );

                        // Remember the top-level container
                        tmp = fragment.firstChild;

                        // Ensure the created nodes are orphaned (#12392)
                        tmp.textContent = "";
                    }
                }
            }

            // Remove wrapper from fragment
            fragment.textContent = "";

            i = 0;
            while ( (elem = nodes[ i++ ]) ) {

                // #4087 - If origin and destination elements are the same, and this is
                // that element, do not do anything
                if ( selection && uEdit.inArray( elem, selection ) !== -1 ) {
                    continue;
                }

                contains = uEdit.contains( elem.ownerDocument, elem );

                // Append to fragment
                tmp = getAll( fragment.appendChild( elem ), "script" );

                // Preserve script evaluation history
                if ( contains ) {
                    setGlobalEval( tmp );
                }

                // Capture executables
                if ( scripts ) {
                    j = 0;
                    while ( (elem = tmp[ j++ ]) ) {
                        if ( rscriptType.test( elem.type || "" ) ) {
                            scripts.push( elem );
                        }
                    }
                }
            }

            return fragment;
        },

        cleanData: function( elems ) 
        {
            var data, elem, type, key,
                special = uEdit.event.special,
                i = 0;

            for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
                if ( uEdit.acceptData( elem ) ) {
                    key = elem[ dataPriv.expando ];

                    if ( key && (data = dataPriv.cache[ key ]) ) {
                        if ( data.events ) {
                            for ( type in data.events ) {
                                if ( special[ type ] ) {
                                    uEdit.event.remove( elem, type );

                                // This is a shortcut to avoid uEdit.event.remove's overhead
                                } else {
                                    uEdit.removeEvent( elem, type, data.handle );
                                }
                            }
                        }
                        if ( dataPriv.cache[ key ] ) {
                            // Discard any remaining `private` data
                            delete dataPriv.cache[ key ];
                        }
                    }
                }
                // Discard any remaining `user` data
                delete dataUser.cache[ elem[ dataUser.expando ] ];
            }
        }
    });
    
    uEdit.fn.extend
    ({
        text: function( value ) {
            return access( this, function( value ) {
                return value === undefined ?
                    uEdit.text( this ) :
                    this.empty().each(function() {
                        if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                            this.textContent = value;
                        }
                    });
            }, null, value, arguments.length );
        },

        append: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.appendChild( elem );
                }
            });
        },

        prepend: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.insertBefore( elem, target.firstChild );
                }
            });
        },

        before: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            });
        },

        after: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            });
        },

        remove: function( selector, keepData /* Internal Use Only */ ) {
            var elem,
                elems = selector ? uEdit.filter( selector, this ) : this,
                i = 0;

            for ( ; (elem = elems[i]) != null; i++ ) {
                if ( !keepData && elem.nodeType === 1 ) {
                    uEdit.cleanData( getAll( elem ) );
                }

                if ( elem.parentNode ) {
                    if ( keepData && uEdit.contains( elem.ownerDocument, elem ) ) {
                        setGlobalEval( getAll( elem, "script" ) );
                    }
                    elem.parentNode.removeChild( elem );
                }
            }

            return this;
        },

        empty: function() {
            var elem,
                i = 0;

            for ( ; (elem = this[i]) != null; i++ ) {
                if ( elem.nodeType === 1 ) {

                    // Prevent memory leaks
                    uEdit.cleanData( getAll( elem, false ) );

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        clone: function( dataAndEvents, deepDataAndEvents ) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function() {
                return uEdit.clone( this, dataAndEvents, deepDataAndEvents );
            });
        },

        html: function( value ) {
            return access( this, function( value ) {
                var elem = this[ 0 ] || {},
                    i = 0,
                    l = this.length;

                if ( value === undefined && elem.nodeType === 1 ) {
                    return elem.innerHTML;
                }

                // See if we can take a shortcut and just use innerHTML
                if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                    !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

                    value = value.replace( rxhtmlTag, "<$1></$2>" );

                    try {
                        for ( ; i < l; i++ ) {
                            elem = this[ i ] || {};

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                uEdit.cleanData( getAll( elem, false ) );
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                    // If using innerHTML throws an exception, use the fallback method
                    } catch ( e ) {}
                }

                if ( elem ) {
                    this.empty().append( value );
                }
            }, null, value, arguments.length );
        },

        replaceWith: function() {
            var arg = arguments[ 0 ];

            // Make the changes, replacing each context element with the new content
            this.domManip( arguments, function( elem ) {
                arg = this.parentNode;

                uEdit.cleanData( getAll( this ) );

                if ( arg ) {
                    arg.replaceChild( elem, this );
                }
            });

            // Force removal if there was no new content (e.g., from empty arguments)
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },

        detach: function( selector ) {
            return this.remove( selector, true );
        },

        domManip: function( args, callback ) {

            // Flatten any nested arrays
            args = concat.apply( [], args );

            var fragment, first, scripts, hasScripts, node, doc,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[ 0 ],
                isFunction = uEdit.isFunction( value );

            // We can't cloneNode fragments that contain checked, in WebKit
            if ( isFunction ||
                    ( l > 1 && typeof value === "string" &&
                        !support.checkClone && rchecked.test( value ) ) ) {
                return this.each(function( index ) {
                    var self = set.eq( index );
                    if ( isFunction ) {
                        args[ 0 ] = value.call( this, index, self.html() );
                    }
                    self.domManip( args, callback );
                });
            }

            if ( l ) {
                fragment = uEdit.buildFragment( args, this[ 0 ].ownerDocument, false, this );
                first = fragment.firstChild;

                if ( fragment.childNodes.length === 1 ) {
                    fragment = first;
                }

                if ( first ) {
                    scripts = uEdit.map( getAll( fragment, "script" ), disableScript );
                    hasScripts = scripts.length;

                    // Use the original fragment for the last item
                    // instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for ( ; i < l; i++ ) {
                        node = fragment;

                        if ( i !== iNoClone ) {
                            node = uEdit.clone( node, true, true );

                            // Keep references to cloned scripts for later restoration
                            if ( hasScripts ) {
                                // Support: QtWebKit
                                // uEdit.merge because push.apply(_, arraylike) throws
                                uEdit.merge( scripts, getAll( node, "script" ) );
                            }
                        }

                        callback.call( this[ i ], node, i );
                    }

                    if ( hasScripts ) {
                        doc = scripts[ scripts.length - 1 ].ownerDocument;

                        // Reenable scripts
                        uEdit.map( scripts, restoreScript );

                        // Evaluate executable scripts on first document insertion
                        for ( i = 0; i < hasScripts; i++ ) {
                            node = scripts[ i ];
                            if ( rscriptType.test( node.type || "" ) &&
                                !dataPriv.access( node, "globalEval" ) &&
                                uEdit.contains( doc, node ) ) {

                                if ( node.src ) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if ( uEdit._evalUrl ) {
                                        uEdit._evalUrl( node.src );
                                    }
                                } else {
                                    uEdit.globalEval( node.textContent.replace( rcleanScript, "" ) );
                                }
                            }
                        }
                    }
                }
            }

            return this;
        }
    });

    uEdit.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        uEdit.fn( name, function( selector ) {
            var elems,
                ret = [],
                insert = uEdit( selector ),
                last = insert.length - 1,
                i = 0;

            for ( ; i <= last; i++ ) {
                elems = i === last ? this : this.clone( true );
                uEdit( insert[ i ] )[ original ]( elems );

                // Support: QtWebKit
                // .get() because push.apply(_, arraylike) throws
                push.apply( ret, elems.get() );
            }

            return this.pushStack( ret );
        });
    });

})( uEdit, uEdit.concat, uEdit.push, uEdit.access, uEdit.support, uEdit.data(), uEdit.data() );;

// Filename: src/ue-core-wrap.js

(function( uEdit )
{
    uEdit.fn.extend
    ({
        wrapAll: function( html ) {
            var wrap;

            if ( uEdit.isFunction( html ) ) {
                return this.each(function( i ) {
                    uEdit( this ).wrapAll( html.call(this, i) );
                });
            }

            if ( this[ 0 ] ) {

                // The elements to wrap the target around
                wrap = uEdit( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

                if ( this[ 0 ].parentNode ) {
                    wrap.insertBefore( this[ 0 ] );
                }

                wrap.map(function() {
                    var elem = this;

                    while ( elem.firstElementChild ) {
                        elem = elem.firstElementChild;
                    }

                    return elem;
                }).append( this );
            }

            return this;
        },

        wrapInner: function( html ) {
            if ( uEdit.isFunction( html ) ) {
                return this.each(function( i ) {
                    uEdit( this ).wrapInner( html.call(this, i) );
                });
            }

            return this.each(function() {
                var self = uEdit( this ),
                    contents = self.contents();

                if ( contents.length ) {
                    contents.wrapAll( html );

                } else {
                    self.append( html );
                }
            });
        },

        wrap: function( html ) {
            var isFunction = uEdit.isFunction( html );

            return this.each(function( i ) {
                uEdit( this ).wrapAll( isFunction ? html.call(this, i) : html );
            });
        },

        unwrap: function() {
            return this.parent().each(function() {
                if ( !uEdit.nodeName( this, "body" ) ) {
                    uEdit( this ).replaceWith( this.childNodes );
                }
            }).end();
        }
    });

})( uEdit );;

// Filename: src/ue-core-css.js

(function( uEdit, support, access, pnum, dataPriv )
{

    var

    rdisplayswap        = /^(none|table(?!-c[ea]).+)/,

    rmargin             = /^margin/,

    rnumsplit           = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

    rnumnonpx           = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" ),

    rrelNum             = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

    cssShow             = { position: "absolute", visibility: "hidden", display: "block" },

    cssNormalTransform  = 
    {
        letterSpacing   : "0",
        fontWeight      : "400"
    },

    cssPrefixes         = [ "Webkit", "O", "Moz", "ms" ],

    cssExpand           = [ "Top", "Right", "Bottom", "Left" ],

    getStyles           = function( elem ) 
    {
        // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        if ( elem.ownerDocument.defaultView.opener ) {
            return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
        }

        return window.getComputedStyle( elem, null );
    },

    curCSS              = function ( elem, name, computed ) 
    {
        var width, minWidth, maxWidth, ret,
            style = elem.style;

        computed = computed || getStyles( elem );

        // Support: IE9
        // getPropertyValue is only needed for .css('filter') (#12537)
        if ( computed ) {
            ret = computed.getPropertyValue( name ) || computed[ name ];
        }

        if ( computed ) {

            if ( ret === "" && !uEdit.contains( elem.ownerDocument, elem ) ) {
                ret = uEdit.style( elem, name );
            }

            // Support: iOS < 6
            // A tribute to the "awesome hack by Dean Edwards"
            // iOS < 6 (at least) returns percentage for a larger set of values,
            // but width seems to be reliably pixels
            // this is against the CSSOM draft spec:
            // http://dev.w3.org/csswg/cssom/#resolved-values
            if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?
            // Support: IE
            // IE returns zIndex value as an integer.
            ret + "" :
            ret;
    },

    // Return a css property mapped to a potentially vendor prefixed property
    vendorPropName          = function ( style, name ) 
    {

        // Shortcut for names that are not vendor prefixed
        if ( name in style ) {
            return name;
        }

        // Check for vendor prefixed names
        var capName = name[0].toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;

        while ( i-- ) {
            name = cssPrefixes[ i ] + capName;
            if ( name in style ) {
                return name;
            }
        }

        return origName;
    },

    setPositiveNumber       = function ( elem, value, subtract ) 
    {
        var matches = rnumsplit.exec( value );
        return matches ?
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
            value;
    },

    augmentWidthOrHeight    = function ( elem, name, extra, isBorderBox, styles ) 
    {
        var i = extra === ( isBorderBox ? "border" : "content" ) ?
            // If we already have the right measurement, avoid augmentation
            4 :
            // Otherwise initialize for horizontal or vertical properties
            name === "width" ? 1 : 0,

            val = 0;

        for ( ; i < 4; i += 2 ) {
            // Both box models exclude margin, so add it if we want it
            if ( extra === "margin" ) {
                val += uEdit.css( elem, extra + cssExpand[ i ], true, styles );
            }

            if ( isBorderBox ) {
                // border-box includes padding, so remove it if we want content
                if ( extra === "content" ) {
                    val -= uEdit.css( elem, "padding" + cssExpand[ i ], true, styles );
                }

                // At this point, extra isn't border nor margin, so remove border
                if ( extra !== "margin" ) {
                    val -= uEdit.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            } else {
                // At this point, extra isn't content, so add padding
                val += uEdit.css( elem, "padding" + cssExpand[ i ], true, styles );

                // At this point, extra isn't content nor padding, so add border
                if ( extra !== "padding" ) {
                    val += uEdit.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            }
        }

        return val;
    }

    getWidthOrHeight        = function( elem, name, extra ) 
    {

        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles( elem ),
            isBorderBox = uEdit.css( elem, "boxSizing", false, styles ) === "border-box";

        // Some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if ( val <= 0 || val == null ) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS( elem, name, styles );
            if ( val < 0 || val == null ) {
                val = elem.style[ name ];
            }

            // Computed unit is not pixels. Stop here and return.
            if ( rnumnonpx.test(val) ) {
                return val;
            }

            // Check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox &&
                ( support.boxSizingReliable() || val === elem.style[ name ] );

            // Normalize "", auto, and prepare for extra
            val = parseFloat( val ) || 0;
        }

        // Use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || ( isBorderBox ? "border" : "content" ),
                valueIsBorderBox,
                styles
            )
        ) + "px";
    }

    showHide                = function( elements, show ) 
    {
        var display, elem, hidden,
            values = [],
            index = 0,
            length = elements.length;

        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }

            values[ index ] = dataPriv.get( elem, "olddisplay" );
            display = elem.style.display;
            if ( show ) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if ( !values[ index ] && display === "none" ) {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if ( elem.style.display === "" && isHidden( elem ) ) {
                    values[ index ] = dataPriv.access(
                        elem,
                        "olddisplay",
                        defaultDisplay(elem.nodeName)
                    );
                }
            } else {
                hidden = isHidden( elem );

                if ( display !== "none" || !hidden ) {
                    dataPriv.set(
                        elem,
                        "olddisplay",
                        hidden ? display : uEdit.css( elem, "display" )
                    );
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( index = 0; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                elem.style.display = show ? values[ index ] || "" : "none";
            }
        }

        return elements;
    },

    addGetHookIf            = function ( conditionFn, hookFn ) 
    {
        // Define the hook, we'll check on the first run if it's really needed.
        return {
                get: function() {
                    if ( conditionFn() ) 
                    {
                        // Hook not needed (or it's not possible to use it due
                        // to missing dependency), remove it.
                        delete this.get;
                        return;
                    }

                    // Hook needed; redefine it so that the support test is not executed again.
                    return (this.get = hookFn).apply( this, arguments );
                }
            };
    },

    isHidden                = function( elem, el ) 
    {
        // isHidden might be called from uEdit#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return uEdit.css( elem, "display" ) === "none" ||
            !uEdit.contains( elem.ownerDocument, elem );
    };

    uEdit.extend
    ({

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: 
        {
            opacity: 
            {
                get: function( elem, computed ) {
                    if ( computed ) {

                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: 
        {
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            "float": "cssFloat"
        },

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {

            // Don't set styles on text and comment nodes
            if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = uEdit.camelCase( name ),
                style = elem.style;

            name = uEdit.cssProps[ origName ] ||
                ( uEdit.cssProps[ origName ] = vendorPropName( style, origName ) );

            // Gets hook for the prefixed version, then unprefixed version
            hooks = uEdit.cssHooks[ name ] || uEdit.cssHooks[ origName ];

            // Check if we're setting a value
            if ( value !== undefined ) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                    value = ( ret[1] + 1 ) * ret[2] + parseFloat( uEdit.css( elem, name ) );
                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if ( value == null || value !== value ) {
                    return;
                }

                // If a number, add 'px' to the (except for certain CSS properties)
                if ( type === "number" && !uEdit.cssNumber[ origName ] ) {
                    value += "px";
                }

                // Support: IE9-11+
                // background-* props affect original clone's values
                if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
                    style[ name ] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if ( !hooks || !("set" in hooks) ||
                    (value = hooks.set( elem, value, extra )) !== undefined ) {

                    style[ name ] = value;
                }

            } else {
                // If a hook was provided get the non-computed value from there
                if ( hooks && "get" in hooks &&
                    (ret = hooks.get( elem, false, extra )) !== undefined ) {

                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },

        css: function( elem, name, extra, styles ) {
            var val, num, hooks,
                origName = uEdit.camelCase( name );

            // Make sure that we're working with the right name
            name = uEdit.cssProps[ origName ] ||
                ( uEdit.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

            // Try prefixed name followed by the unprefixed name
            hooks = uEdit.cssHooks[ name ] || uEdit.cssHooks[ origName ];

            // If a hook was provided get the computed value from there
            if ( hooks && "get" in hooks ) {
                val = hooks.get( elem, true, extra );
            }

            // Otherwise, if a way to get the computed value exists, use that
            if ( val === undefined ) {
                val = curCSS( elem, name, styles );
            }

            // Convert "normal" to computed value
            if ( val === "normal" && name in cssNormalTransform ) {
                val = cssNormalTransform[ name ];
            }

            // Make numeric if forced or a qualifier was provided and val looks numeric
            if ( extra === "" || extra ) {
                num = parseFloat( val );
                return extra === true || uEdit.isNumeric( num ) ? num || 0 : val;
            }
            return val;
        }
    });

    uEdit.each([ "height", "width" ], function( i, name ) 
    {
        uEdit.cssHooks[ name ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test( uEdit.css( elem, "display" ) ) &&
                        elem.offsetWidth === 0 ?
                            uEdit.swap( elem, cssShow, function() {
                                return getWidthOrHeight( elem, name, extra );
                            }) :
                            getWidthOrHeight( elem, name, extra );
                }
            },

            set: function( elem, value, extra ) {
                var styles = extra && getStyles( elem );
                return setPositiveNumber( elem, value, extra ?
                    augmentWidthOrHeight(
                        elem,
                        name,
                        extra,
                        uEdit.css( elem, "boxSizing", false, styles ) === "border-box",
                        styles
                    ) : 0
                );
            }
        };
    });

    // Support: Android 2.3
    uEdit.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
        function( elem, computed ) {
            if ( computed ) {
                return uEdit.swap( elem, { "display": "inline-block" },
                    curCSS, [ elem, "marginRight" ] );
            }
        }
    );

    // These hooks are used by animate to expand properties
    uEdit.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        uEdit.cssHooks[ prefix + suffix ] = {
            expand: function( value ) {
                var i = 0,
                    expanded = {},

                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [ value ];

                for ( ; i < 4; i++ ) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }

                return expanded;
            }
        };

        if ( !rmargin.test( prefix ) ) {
            uEdit.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    });

    uEdit.fn.extend({
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;

                if ( uEdit.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;

                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = uEdit.css( elem, name[ i ], false, styles );
                    }

                    return map;
                }

                return value !== undefined ?
                    uEdit.style( elem, name, value ) :
                    uEdit.css( elem, name );
            }, name, value, arguments.length > 1 );
        },
        show: function() {
            return showHide( this, true );
        },
        hide: function() {
            return showHide( this );
        },
        toggle: function( state ) {
            if ( typeof state === "boolean" ) {
                return state ? this.show() : this.hide();
            }

            return this.each(function() {
                if ( isHidden( this ) ) {
                    uEdit( this ).show();
                } else {
                    uEdit( this ).hide();
                }
            });
        }
    });

})( uEdit, uEdit.support, uEdit.access, uEdit.vars.pnum, uEdit.data() );;

// Filename: src/ue-selector.js

(function( uEdit ) {

var i,
    support,
    Expr,
    getText,
    isXML,
    tokenize,
    compile,
    select,
    outermostContext,
    sortInput,
    hasDuplicate,

    // Local document vars
    setDocument,
    document,
    docElem,
    documentIsHTML,
    rbuggyQSA,
    rbuggyMatches,
    matches,
    contains,

    // Instance-specific data
    expando = "ueSelector" + -(new Date()),
    preferredDoc = window.document,
    dirruns = 0,
    done = 0,
    classCache = createCache(),
    tokenCache = createCache(),
    compilerCache = createCache(),
    sortOrder = function( a, b ) {
        if ( a === b ) {
            hasDuplicate = true;
        }
        return 0;
    },

    // General-purpose constants
    strundefined = typeof undefined,
    MAX_NEGATIVE = 1 << 31,

    // Instance methods
    hasOwn = ({}).hasOwnProperty,
    arr = [],
    pop = arr.pop,
    push_native = arr.push,
    push = arr.push,
    slice = arr.slice,
    // Use a stripped-down indexOf if we can't use a native one
    indexOf = arr.indexOf || function( elem ) {
        var i = 0,
            len = this.length;
        for ( ; i < len; i++ ) {
            if ( this[i] === elem ) {
                return i;
            }
        }
        return -1;
    },

    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

    // Regular expressions

    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",

    // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

    // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
        // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace +
        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
        "*\\]",

    pseudos = ":(" + identifier + ")(?:\\((" +
        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
        // 1. quoted (capture 3; capture 4 or capture 5)
        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
        // 2. simple (capture 6)
        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
        // 3. anything else (capture 2)
        ".*" +
        ")\\)|)",

    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

    rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
    rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

    rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

    rpseudo = new RegExp( pseudos ),
    ridentifier = new RegExp( "^" + identifier + "$" ),

    matchExpr = {
        "ID": new RegExp( "^#(" + identifier + ")" ),
        "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
        "TAG": new RegExp( "^(" + identifier + "|[*])" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
            "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
    },

    rinputs = /^(?:input|select|textarea|button)$/i,
    rheader = /^h\d$/i,

    rnative = /^[^{]+\{\s*\[native \w/,

    // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

    rsibling = /[+~]/,
    rescape = /'|\\/g,

    // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
    funescape = function( _, escaped, escapedWhitespace ) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ?
            escaped :
            high < 0 ?
                // BMP codepoint
                String.fromCharCode( high + 0x10000 ) :
                // Supplemental Plane codepoint (surrogate pair)
                String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
    };

// Optimize for push.apply( _, NodeList )
try {
    push.apply(
        (arr = slice.call( preferredDoc.childNodes )),
        preferredDoc.childNodes
    );
    // Support: Android<4.0
    // Detect silently failing push.apply
    arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
    push = { apply: arr.length ?

        // Leverage slice if possible
        function( target, els ) {
            push_native.apply( target, slice.call(els) );
        } :

        // Support: IE<9
        // Otherwise append directly
        function( target, els ) {
            var j = target.length,
                i = 0;
            // Can't trust NodeList.length
            while ( (target[j++] = els[i++]) ) {}
            target.length = j - 1;
        }
    };
}

function ueSelector( selector, context, results, seed ) {
    var match, elem, m, nodeType,
        // QSA vars
        i, groups, old, nid, newContext, newSelector;

    if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
        setDocument( context );
    }

    context = context || document;
    results = results || [];

    if ( !selector || typeof selector !== "string" ) {
        return results;
    }

    if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
        return [];
    }

    if ( documentIsHTML && !seed ) {

        // Shortcuts
        if ( (match = rquickExpr.exec( selector )) ) {
            // Speed-up: ueSelector("#ID")
            if ( (m = match[1]) ) {
                if ( nodeType === 9 ) {
                    elem = context.getElementById( m );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document (jQuery #6963)
                    if ( elem && elem.parentNode ) {
                        // Handle the case where IE, Opera, and Webkit return items
                        // by name instead of ID
                        if ( elem.id === m ) {
                            results.push( elem );
                            return results;
                        }
                    } else {
                        return results;
                    }
                } else {
                    // Context is not a document
                    if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                        contains( context, elem ) && elem.id === m ) {
                        results.push( elem );
                        return results;
                    }
                }

            // Speed-up: ueSelector("TAG")
            } else if ( match[2] ) {
                push.apply( results, context.getElementsByTagName( selector ) );
                return results;

            // Speed-up: ueSelector(".CLASS")
            } else if ( (m = match[3]) && support.getElementsByClassName ) {
                push.apply( results, context.getElementsByClassName( m ) );
                return results;
            }
        }

        // QSA path
        if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
            nid = old = expando;
            newContext = context;
            newSelector = nodeType === 9 && selector;

            // qSA works strangely on Element-rooted queries
            // We can work around this by specifying an extra ID on the root
            // and working up from there (Thanks to Andrew Dupont for the technique)
            // IE 8 doesn't work on object elements
            if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                groups = tokenize( selector );

                if ( (old = context.getAttribute("id")) ) {
                    nid = old.replace( rescape, "\\$&" );
                } else {
                    context.setAttribute( "id", nid );
                }
                nid = "[id='" + nid + "'] ";

                i = groups.length;
                while ( i-- ) {
                    groups[i] = nid + toSelector( groups[i] );
                }
                newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                newSelector = groups.join(",");
            }

            if ( newSelector ) {
                try {
                    push.apply( results,
                        newContext.querySelectorAll( newSelector )
                    );
                    return results;
                } catch(qsaError) {
                } finally {
                    if ( !old ) {
                        context.removeAttribute("id");
                    }
                }
            }
        }
    }

    // All others
    return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
    var keys = [];

    function cache( key, value ) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if ( keys.push( key + " " ) > Expr.cacheLength ) {
            // Only keep the most recent entries
            delete cache[ keys.shift() ];
        }
        return (cache[ key + " " ] = value);
    }
    return cache;
}

/**
 * Mark a function for special use by ueSelector
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
    fn[ expando ] = true;
    return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
    var div = document.createElement("div");

    try {
        return !!fn( div );
    } catch (e) {
        return false;
    } finally {
        // Remove from its parent by default
        if ( div.parentNode ) {
            div.parentNode.removeChild( div );
        }
        // release memory in IE
        div = null;
    }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
    var arr = attrs.split("|"),
        i = attrs.length;

    while ( i-- ) {
        Expr.attrHandle[ arr[i] ] = handler;
    }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
    var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
            ( ~b.sourceIndex || MAX_NEGATIVE ) -
            ( ~a.sourceIndex || MAX_NEGATIVE );

    // Use IE sourceIndex if available on both nodes
    if ( diff ) {
        return diff;
    }

    // Check if b follows a
    if ( cur ) {
        while ( (cur = cur.nextSibling) ) {
            if ( cur === b ) {
                return -1;
            }
        }
    }

    return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
    };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
    return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
    };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
    return markFunction(function( argument ) {
        argument = +argument;
        return markFunction(function( seed, matches ) {
            var j,
                matchIndexes = fn( [], seed.length, argument ),
                i = matchIndexes.length;

            // Match elements found at the specified indexes
            while ( i-- ) {
                if ( seed[ (j = matchIndexes[i]) ] ) {
                    seed[j] = !(matches[j] = seed[j]);
                }
            }
        });
    });
}

/**
 * Checks a node for validity as a ueSelector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
    return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = ueSelector.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = ueSelector.isXML = function( elem ) {
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = ueSelector.setDocument = function( node ) {
    var hasCompare,
        doc = node ? node.ownerDocument || node : preferredDoc,
        parent = doc.defaultView;

    // If no document and documentElement is available, return
    if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
        return document;
    }

    // Set our document
    document = doc;
    docElem = doc.documentElement;

    // Support tests
    documentIsHTML = !isXML( doc );

    // Support: IE>8
    // If iframe document is assigned to "document" variable and if iframe has been reloaded,
    // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
    // IE6-8 do not support the defaultView property so parent will be undefined
    if ( parent && parent !== parent.top ) {
        // IE11 does not have attachEvent, so all must suffer
        if ( parent.addEventListener ) {
            parent.addEventListener( "unload", function() {
                setDocument();
            }, false );
        } else if ( parent.attachEvent ) {
            parent.attachEvent( "onunload", function() {
                setDocument();
            });
        }
    }

    /* Attributes
    ---------------------------------------------------------------------- */

    // Support: IE<8
    // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
    support.attributes = assert(function( div ) {
        div.className = "i";
        return !div.getAttribute("className");
    });

    /* getElement(s)By*
    ---------------------------------------------------------------------- */

    // Check if getElementsByTagName("*") returns only elements
    support.getElementsByTagName = assert(function( div ) {
        div.appendChild( doc.createComment("") );
        return !div.getElementsByTagName("*").length;
    });

    // Support: IE<9
    support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

    // Support: IE<10
    // Check if getElementById returns elements by name
    // The broken getElementById methods don't pick up programatically-set names,
    // so use a roundabout getElementsByName test
    support.getById = assert(function( div ) {
        docElem.appendChild( div ).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
    });

    // ID find and filter
    if ( support.getById ) {
        Expr.find["ID"] = function( id, context ) {
            if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
                var m = context.getElementById( id );
                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                return m && m.parentNode ? [ m ] : [];
            }
        };
        Expr.filter["ID"] = function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                return elem.getAttribute("id") === attrId;
            };
        };
    } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find["ID"];

        Expr.filter["ID"] =  function( id ) {
            var attrId = id.replace( runescape, funescape );
            return function( elem ) {
                var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                return node && node.value === attrId;
            };
        };
    }

    // Tag
    Expr.find["TAG"] = support.getElementsByTagName ?
        function( tag, context ) {
            if ( typeof context.getElementsByTagName !== strundefined ) {
                return context.getElementsByTagName( tag );
            }
        } :
        function( tag, context ) {
            var elem,
                tmp = [],
                i = 0,
                results = context.getElementsByTagName( tag );

            // Filter out possible comments
            if ( tag === "*" ) {
                while ( (elem = results[i++]) ) {
                    if ( elem.nodeType === 1 ) {
                        tmp.push( elem );
                    }
                }

                return tmp;
            }
            return results;
        };

    // Class
    Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
        if ( documentIsHTML ) {
            return context.getElementsByClassName( className );
        }
    };

    /* QSA/matchesSelector
    ---------------------------------------------------------------------- */

    // QSA and matchesSelector support

    // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
    rbuggyMatches = [];

    // qSa(:focus) reports false when true (Chrome 21)
    // We allow this because of a bug in IE8/9 that throws an error
    // whenever `document.activeElement` is accessed on an iframe
    // So, we allow :focus to pass through QSA all the time to avoid the IE error
    // See http://bugs.jquery.com/ticket/13378
    rbuggyQSA = [];

    if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function( div ) {
            // Select is set to empty string on purpose
            // This is to test IE's treatment of not explicitly
            // setting a boolean content attribute,
            // since its presence should be enough
            // http://bugs.jquery.com/ticket/12359
            div.innerHTML = "<select msallowcapture=''><option selected=''></option></select>";

            // Support: IE8, Opera 11-12.16
            // Nothing should be selected when empty strings follow ^= or $= or *=
            // The test attribute must be unknown in Opera but "safe" for WinRT
            // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
            if ( div.querySelectorAll("[msallowcapture^='']").length ) {
                rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
            }

            // Support: IE8
            // Boolean attributes and "value" are not treated correctly
            if ( !div.querySelectorAll("[selected]").length ) {
                rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
            }

            // Webkit/Opera - :checked should return selected option elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":checked").length ) {
                rbuggyQSA.push(":checked");
            }
        });

        assert(function( div ) {
            // Support: Windows 8 Native Apps
            // The type and name attributes are restricted during .innerHTML assignment
            var input = doc.createElement("input");
            input.setAttribute( "type", "hidden" );
            div.appendChild( input ).setAttribute( "name", "D" );

            // Support: IE8
            // Enforce case-sensitivity of name attribute
            if ( div.querySelectorAll("[name=d]").length ) {
                rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
            }

            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
            // IE8 throws error here and will not see later tests
            if ( !div.querySelectorAll(":enabled").length ) {
                rbuggyQSA.push( ":enabled", ":disabled" );
            }

            // Opera 10-11 does not throw on post-comma invalid pseudos
            div.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
        });
    }

    if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
        docElem.webkitMatchesSelector ||
        docElem.mozMatchesSelector ||
        docElem.oMatchesSelector ||
        docElem.msMatchesSelector) )) ) {

        assert(function( div ) {
            // Check to see if it's possible to do matchesSelector
            // on a disconnected node (IE 9)
            support.disconnectedMatch = matches.call( div, "div" );

            // This should fail with an exception
            // Gecko does not error, returns false instead
            matches.call( div, "[s!='']:x" );
            rbuggyMatches.push( "!=", pseudos );
        });
    }

    rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
    rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

    /* Contains
    ---------------------------------------------------------------------- */
    hasCompare = rnative.test( docElem.compareDocumentPosition );

    // Element contains another
    // Purposefully does not implement inclusive descendent
    // As in, an element does not contain itself
    contains = hasCompare || rnative.test( docElem.contains ) ?
        function( a, b ) {
            var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
            return a === bup || !!( bup && bup.nodeType === 1 && (
                adown.contains ?
                    adown.contains( bup ) :
                    a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
            ));
        } :
        function( a, b ) {
            if ( b ) {
                while ( (b = b.parentNode) ) {
                    if ( b === a ) {
                        return true;
                    }
                }
            }
            return false;
        };

    /* Sorting
    ---------------------------------------------------------------------- */

    // Document order sorting
    sortOrder = hasCompare ?
    function( a, b ) {

        // Flag for duplicate removal
        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if ( compare ) {
            return compare;
        }

        // Calculate position if both inputs belong to the same document
        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
            a.compareDocumentPosition( b ) :

            // Otherwise we know they are disconnected
            1;

        // Disconnected nodes
        if ( compare & 1 ||
            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

            // Choose the first element that is related to our preferred document
            if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                return -1;
            }
            if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                return 1;
            }

            // Maintain original order
            return sortInput ?
                ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                0;
        }

        return compare & 4 ? -1 : 1;
    } :
    function( a, b ) {
        // Exit early if the nodes are identical
        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [ a ],
            bp = [ b ];

        // Parentless nodes are either documents or disconnected
        if ( !aup || !bup ) {
            return a === doc ? -1 :
                b === doc ? 1 :
                aup ? -1 :
                bup ? 1 :
                sortInput ?
                ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                0;

        // If the nodes are siblings, we can do a quick check
        } else if ( aup === bup ) {
            return siblingCheck( a, b );
        }

        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while ( (cur = cur.parentNode) ) {
            ap.unshift( cur );
        }
        cur = b;
        while ( (cur = cur.parentNode) ) {
            bp.unshift( cur );
        }

        // Walk down the tree looking for a discrepancy
        while ( ap[i] === bp[i] ) {
            i++;
        }

        return i ?
            // Do a sibling check if the nodes have a common ancestor
            siblingCheck( ap[i], bp[i] ) :

            // Otherwise nodes in our document sort first
            ap[i] === preferredDoc ? -1 :
            bp[i] === preferredDoc ? 1 :
            0;
    };

    return doc;
};

ueSelector.matches = function( expr, elements ) {
    return ueSelector( expr, null, null, elements );
};

ueSelector.matchesSelector = function( elem, expr ) {
    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    // Make sure that attribute selectors are quoted
    expr = expr.replace( rattributeQuotes, "='$1']" );

    if ( support.matchesSelector && documentIsHTML &&
        ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
        ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

        try {
            var ret = matches.call( elem, expr );

            // IE 9's matchesSelector returns false on disconnected nodes
            if ( ret || support.disconnectedMatch ||
                    // As well, disconnected nodes are said to be in a document
                    // fragment in IE 9
                    elem.document && elem.document.nodeType !== 11 ) {
                return ret;
            }
        } catch(e) {}
    }

    return ueSelector( expr, document, null, [ elem ] ).length > 0;
};

ueSelector.contains = function( context, elem ) {
    // Set document vars if needed
    if ( ( context.ownerDocument || context ) !== document ) {
        setDocument( context );
    }
    return contains( context, elem );
};

ueSelector.attr = function( elem, name ) {
    // Set document vars if needed
    if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
    }

    var fn = Expr.attrHandle[ name.toLowerCase() ],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
            fn( elem, name, !documentIsHTML ) :
            undefined;

    return val !== undefined ?
        val :
        support.attributes || !documentIsHTML ?
            elem.getAttribute( name ) :
            (val = elem.getAttributeNode(name)) && val.specified ?
                val.value :
                null;
};

ueSelector.error = function( msg ) {
    throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
ueSelector.uniqueSort = function( results ) {
    var elem,
        duplicates = [],
        j = 0,
        i = 0;

    // Unless we *know* we can detect duplicates, assume their presence
    hasDuplicate = !support.detectDuplicates;
    sortInput = !support.sortStable && results.slice( 0 );
    results.sort( sortOrder );

    if ( hasDuplicate ) {
        while ( (elem = results[i++]) ) {
            if ( elem === results[ i ] ) {
                j = duplicates.push( i );
            }
        }
        while ( j-- ) {
            results.splice( duplicates[ j ], 1 );
        }
    }

    // Clear input after sorting to release objects
    // See https://github.com/jquery/ueSelector/pull/225
    sortInput = null;

    return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = ueSelector.getText = function( elem ) {
    var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

    if ( !nodeType ) {
        // If no nodeType, this is expected to be an array
        while ( (node = elem[i++]) ) {
            // Do not traverse comment nodes
            ret += getText( node );
        }
    } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if ( typeof elem.textContent === "string" ) {
            return elem.textContent;
        } else {
            // Traverse its children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                ret += getText( elem );
            }
        }
    } else if ( nodeType === 3 || nodeType === 4 ) {
        return elem.nodeValue;
    }
    // Do not include comment or processing instruction nodes

    return ret;
};

Expr = ueSelector.selectors = {

    // Can be adjusted by the user
    cacheLength: 50,

    createPseudo: markFunction,

    match: matchExpr,

    attrHandle: {},

    find: {},

    relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
    },

    preFilter: {
        "ATTR": function( match ) {
            match[1] = match[1].replace( runescape, funescape );

            // Move the given value to match[3] whether quoted or unquoted
            match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

            if ( match[2] === "~=" ) {
                match[3] = " " + match[3] + " ";
            }

            return match.slice( 0, 4 );
        },

        "CHILD": function( match ) {
            /* matches from matchExpr["CHILD"]
                1 type (only|nth|...)
                2 what (child|of-type)
                3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                4 xn-component of xn+y argument ([+-]?\d*n|)
                5 sign of xn-component
                6 x of xn-component
                7 sign of y-component
                8 y of y-component
            */
            match[1] = match[1].toLowerCase();

            if ( match[1].slice( 0, 3 ) === "nth" ) {
                // nth-* requires argument
                if ( !match[3] ) {
                    ueSelector.error( match[0] );
                }

                // numeric x and y parameters for Expr.filter.CHILD
                // remember that false/true cast respectively to 0/1
                match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

            // other types prohibit arguments
            } else if ( match[3] ) {
                ueSelector.error( match[0] );
            }

            return match;
        },

        "PSEUDO": function( match ) {
            var excess,
                unquoted = !match[6] && match[2];

            if ( matchExpr["CHILD"].test( match[0] ) ) {
                return null;
            }

            // Accept quoted arguments as-is
            if ( match[3] ) {
                match[2] = match[4] || match[5] || "";

            // Strip excess characters from unquoted arguments
            } else if ( unquoted && rpseudo.test( unquoted ) &&
                // Get excess from tokenize (recursively)
                (excess = tokenize( unquoted, true )) &&
                // advance to the next closing parenthesis
                (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                // excess is a negative index
                match[0] = match[0].slice( 0, excess );
                match[2] = unquoted.slice( 0, excess );
            }

            // Return only captures needed by the pseudo filter method (type and argument)
            return match.slice( 0, 3 );
        }
    },

    filter: {

        "TAG": function( nodeNameSelector ) {
            var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
            return nodeNameSelector === "*" ?
                function() { return true; } :
                function( elem ) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
        },

        "CLASS": function( className ) {
            var pattern = classCache[ className + " " ];

            return pattern ||
                (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                classCache( className, function( elem ) {
                    return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
                });
        },

        "ATTR": function( name, operator, check ) {
            return function( elem ) {
                var result = ueSelector.attr( elem, name );

                if ( result == null ) {
                    return operator === "!=";
                }
                if ( !operator ) {
                    return true;
                }

                result += "";

                return operator === "=" ? result === check :
                    operator === "!=" ? result !== check :
                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                    operator === "*=" ? check && result.indexOf( check ) > -1 :
                    operator === "$=" ? check && result.slice( -check.length ) === check :
                    operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                    false;
            };
        },

        "CHILD": function( type, what, argument, first, last ) {
            var simple = type.slice( 0, 3 ) !== "nth",
                forward = type.slice( -4 ) !== "last",
                ofType = what === "of-type";

            return first === 1 && last === 0 ?

                // Shortcut for :nth-*(n)
                function( elem ) {
                    return !!elem.parentNode;
                } :

                function( elem, context, xml ) {
                    var cache, outerCache, node, diff, nodeIndex, start,
                        dir = simple !== forward ? "nextSibling" : "previousSibling",
                        parent = elem.parentNode,
                        name = ofType && elem.nodeName.toLowerCase(),
                        useCache = !xml && !ofType;

                    if ( parent ) {

                        // :(first|last|only)-(child|of-type)
                        if ( simple ) {
                            while ( dir ) {
                                node = elem;
                                while ( (node = node[ dir ]) ) {
                                    if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                        return false;
                                    }
                                }
                                // Reverse direction for :only-* (if we haven't yet done so)
                                start = dir = type === "only" && !start && "nextSibling";
                            }
                            return true;
                        }

                        start = [ forward ? parent.firstChild : parent.lastChild ];

                        // non-xml :nth-child(...) stores cache data on `parent`
                        if ( forward && useCache ) {
                            // Seek `elem` from a previously-cached index
                            outerCache = parent[ expando ] || (parent[ expando ] = {});
                            cache = outerCache[ type ] || [];
                            nodeIndex = cache[0] === dirruns && cache[1];
                            diff = cache[0] === dirruns && cache[2];
                            node = nodeIndex && parent.childNodes[ nodeIndex ];

                            while ( (node = ++nodeIndex && node && node[ dir ] ||

                                // Fallback to seeking `elem` from the start
                                (diff = nodeIndex = 0) || start.pop()) ) {

                                // When found, cache indexes on `parent` and break
                                if ( node.nodeType === 1 && ++diff && node === elem ) {
                                    outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            }

                        // Use previously-cached element index if available
                        } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                            diff = cache[1];

                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                        } else {
                            // Use the same loop as above to seek `elem` from the start
                            while ( (node = ++nodeIndex && node && node[ dir ] ||
                                (diff = nodeIndex = 0) || start.pop()) ) {

                                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                    // Cache the index of each encountered element
                                    if ( useCache ) {
                                        (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                    }

                                    if ( node === elem ) {
                                        break;
                                    }
                                }
                            }
                        }

                        // Incorporate the offset, then check against cycle size
                        diff -= last;
                        return diff === first || ( diff % first === 0 && diff / first >= 0 );
                    }
                };
        },

        "PSEUDO": function( pseudo, argument ) {
            // pseudo-class names are case-insensitive
            // http://www.w3.org/TR/selectors/#pseudo-classes
            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
            // Remember that setFilters inherits from pseudos
            var args,
                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                    ueSelector.error( "unsupported pseudo: " + pseudo );

            // The user may use createPseudo to indicate that
            // arguments are needed to create the filter function
            // just as ueSelector does
            if ( fn[ expando ] ) {
                return fn( argument );
            }

            // But maintain support for old signatures
            if ( fn.length > 1 ) {
                args = [ pseudo, pseudo, "", argument ];
                return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                    markFunction(function( seed, matches ) {
                        var idx,
                            matched = fn( seed, argument ),
                            i = matched.length;
                        while ( i-- ) {
                            idx = indexOf.call( seed, matched[i] );
                            seed[ idx ] = !( matches[ idx ] = matched[i] );
                        }
                    }) :
                    function( elem ) {
                        return fn( elem, 0, args );
                    };
            }

            return fn;
        }
    },

    pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function( selector ) {
            // Trim the selector passed to compile
            // to avoid treating leading and trailing
            // spaces as combinators
            var input = [],
                results = [],
                matcher = compile( selector.replace( rtrim, "$1" ) );

            return matcher[ expando ] ?
                markFunction(function( seed, matches, context, xml ) {
                    var elem,
                        unmatched = matcher( seed, null, xml, [] ),
                        i = seed.length;

                    // Match elements unmatched by `matcher`
                    while ( i-- ) {
                        if ( (elem = unmatched[i]) ) {
                            seed[i] = !(matches[i] = elem);
                        }
                    }
                }) :
                function( elem, context, xml ) {
                    input[0] = elem;
                    matcher( input, null, xml, results );
                    return !results.pop();
                };
        }),

        "has": markFunction(function( selector ) {
            return function( elem ) {
                return ueSelector( selector, elem ).length > 0;
            };
        }),

        "contains": markFunction(function( text ) {
            text = text.replace( runescape, funescape );
            return function( elem ) {
                return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
            };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction( function( lang ) {
            // lang value must be a valid identifier
            if ( !ridentifier.test(lang || "") ) {
                ueSelector.error( "unsupported lang: " + lang );
            }
            lang = lang.replace( runescape, funescape ).toLowerCase();
            return function( elem ) {
                var elemLang;
                do {
                    if ( (elemLang = documentIsHTML ?
                        elem.lang :
                        elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                        elemLang = elemLang.toLowerCase();
                        return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                    }
                } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                return false;
            };
        }),

        // Miscellaneous
        "target": function( elem ) {
            var hash = window.location && window.location.hash;
            return hash && hash.slice( 1 ) === elem.id;
        },

        "root": function( elem ) {
            return elem === docElem;
        },

        "focus": function( elem ) {
            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        "enabled": function( elem ) {
            return elem.disabled === false;
        },

        "disabled": function( elem ) {
            return elem.disabled === true;
        },

        "checked": function( elem ) {
            // In CSS3, :checked should return both checked and selected elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            var nodeName = elem.nodeName.toLowerCase();
            return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        "selected": function( elem ) {
            // Accessing this property makes selected-by-default
            // options in Safari work properly
            if ( elem.parentNode ) {
                elem.parentNode.selectedIndex;
            }

            return elem.selected === true;
        },

        // Contents
        "empty": function( elem ) {
            // http://www.w3.org/TR/selectors/#empty-pseudo
            // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
            //   but not by others (comment: 8; processing instruction: 7; etc.)
            // nodeType < 6 works because attributes (2) do not appear as children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                if ( elem.nodeType < 6 ) {
                    return false;
                }
            }
            return true;
        },

        "parent": function( elem ) {
            return !Expr.pseudos["empty"]( elem );
        },

        // Element/input types
        "header": function( elem ) {
            return rheader.test( elem.nodeName );
        },

        "input": function( elem ) {
            return rinputs.test( elem.nodeName );
        },

        "button": function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === "button" || name === "button";
        },

        "text": function( elem ) {
            var attr;
            return elem.nodeName.toLowerCase() === "input" &&
                elem.type === "text" &&

                // Support: IE<8
                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
        },

        // Position-in-collection
        "first": createPositionalPseudo(function() {
            return [ 0 ];
        }),

        "last": createPositionalPseudo(function( matchIndexes, length ) {
            return [ length - 1 ];
        }),

        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
            return [ argument < 0 ? argument + length : argument ];
        }),

        "even": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 0;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "odd": createPositionalPseudo(function( matchIndexes, length ) {
            var i = 1;
            for ( ; i < length; i += 2 ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; --i >= 0; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        }),

        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
            var i = argument < 0 ? argument + length : argument;
            for ( ; ++i < length; ) {
                matchIndexes.push( i );
            }
            return matchIndexes;
        })
    }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];
Expr.pseudos[":"]   = Expr.pseudos;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
    Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
    Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = ueSelector.tokenize = function( selector, parseOnly ) {
    var matched, match, tokens, type,
        soFar, groups, preFilters,
        cached = tokenCache[ selector + " " ];

    if ( cached ) {
        return parseOnly ? 0 : cached.slice( 0 );
    }

    soFar = selector;
    groups = [];
    preFilters = Expr.preFilter;

    while ( soFar ) {

        // Comma and first run
        if ( !matched || (match = rcomma.exec( soFar )) ) {
            if ( match ) {
                // Don't consume trailing commas as valid
                soFar = soFar.slice( match[0].length ) || soFar;
            }
            groups.push( (tokens = []) );
        }

        matched = false;

        // Combinators
        if ( (match = rcombinators.exec( soFar )) ) {
            matched = match.shift();
            tokens.push({
                value: matched,
                // Cast descendant combinators to space
                type: match[0].replace( rtrim, " " )
            });
            soFar = soFar.slice( matched.length );
        }

        // Filters
        for ( type in Expr.filter ) {
            if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                (match = preFilters[ type ]( match ))) ) {
                matched = match.shift();
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                });
                soFar = soFar.slice( matched.length );
            }
        }

        if ( !matched ) {
            break;
        }
    }

    // Return the length of the invalid excess
    // if we're just parsing
    // Otherwise, throw an error or return tokens
    return parseOnly ?
        soFar.length :
        soFar ?
            ueSelector.error( selector ) :
            // Cache the tokens
            tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
    var i = 0,
        len = tokens.length,
        selector = "";
    for ( ; i < len; i++ ) {
        selector += tokens[i].value;
    }
    return selector;
}

function addCombinator( matcher, combinator, base ) {
    var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;

    return combinator.first ?
        // Check against closest ancestor/preceding element
        function( elem, context, xml ) {
            while ( (elem = elem[ dir ]) ) {
                if ( elem.nodeType === 1 || checkNonElements ) {
                    return matcher( elem, context, xml );
                }
            }
        } :

        // Check against all ancestor/preceding elements
        function( elem, context, xml ) {
            var oldCache, outerCache,
                newCache = [ dirruns, doneName ];

            // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
            if ( xml ) {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        if ( matcher( elem, context, xml ) ) {
                            return true;
                        }
                    }
                }
            } else {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        outerCache = elem[ expando ] || (elem[ expando ] = {});
                        if ( (oldCache = outerCache[ dir ]) &&
                            oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                            // Assign to newCache so results back-propagate to previous elements
                            return (newCache[ 2 ] = oldCache[ 2 ]);
                        } else {
                            // Reuse newcache so results back-propagate to previous elements
                            outerCache[ dir ] = newCache;

                            // A match means we're done; a fail means we have to keep checking
                            if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                return true;
                            }
                        }
                    }
                }
            }
        };
}

function elementMatcher( matchers ) {
    return matchers.length > 1 ?
        function( elem, context, xml ) {
            var i = matchers.length;
            while ( i-- ) {
                if ( !matchers[i]( elem, context, xml ) ) {
                    return false;
                }
            }
            return true;
        } :
        matchers[0];
}

function multipleContexts( selector, contexts, results ) {
    var i = 0,
        len = contexts.length;
    for ( ; i < len; i++ ) {
        ueSelector( selector, contexts[i], results );
    }
    return results;
}

function condense( unmatched, map, filter, context, xml ) {
    var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

    for ( ; i < len; i++ ) {
        if ( (elem = unmatched[i]) ) {
            if ( !filter || filter( elem, context, xml ) ) {
                newUnmatched.push( elem );
                if ( mapped ) {
                    map.push( i );
                }
            }
        }
    }

    return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
    if ( postFilter && !postFilter[ expando ] ) {
        postFilter = setMatcher( postFilter );
    }
    if ( postFinder && !postFinder[ expando ] ) {
        postFinder = setMatcher( postFinder, postSelector );
    }
    return markFunction(function( seed, results, context, xml ) {
        var temp, i, elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,

            // Get initial elements from seed or context
            elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

            // Prefilter to get matcher input, preserving a map for seed-results synchronization
            matcherIn = preFilter && ( seed || !selector ) ?
                condense( elems, preMap, preFilter, context, xml ) :
                elems,

            matcherOut = matcher ?
                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                    // ...intermediate processing is necessary
                    [] :

                    // ...otherwise use results directly
                    results :
                matcherIn;

        // Find primary matches
        if ( matcher ) {
            matcher( matcherIn, matcherOut, context, xml );
        }

        // Apply postFilter
        if ( postFilter ) {
            temp = condense( matcherOut, postMap );
            postFilter( temp, [], context, xml );

            // Un-match failing elements by moving them back to matcherIn
            i = temp.length;
            while ( i-- ) {
                if ( (elem = temp[i]) ) {
                    matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                }
            }
        }

        if ( seed ) {
            if ( postFinder || preFilter ) {
                if ( postFinder ) {
                    // Get the final matcherOut by condensing this intermediate into postFinder contexts
                    temp = [];
                    i = matcherOut.length;
                    while ( i-- ) {
                        if ( (elem = matcherOut[i]) ) {
                            // Restore matcherIn since elem is not yet a final match
                            temp.push( (matcherIn[i] = elem) );
                        }
                    }
                    postFinder( null, (matcherOut = []), temp, xml );
                }

                // Move matched elements from seed to results to keep them synchronized
                i = matcherOut.length;
                while ( i-- ) {
                    if ( (elem = matcherOut[i]) &&
                        (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                        seed[temp] = !(results[temp] = elem);
                    }
                }
            }

        // Add elements to results, through postFinder if defined
        } else {
            matcherOut = condense(
                matcherOut === results ?
                    matcherOut.splice( preexisting, matcherOut.length ) :
                    matcherOut
            );
            if ( postFinder ) {
                postFinder( null, results, matcherOut, xml );
            } else {
                push.apply( results, matcherOut );
            }
        }
    });
}

function matcherFromTokens( tokens ) {
    var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[ tokens[0].type ],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator( function( elem ) {
            return elem === checkContext;
        }, implicitRelative, true ),
        matchAnyContext = addCombinator( function( elem ) {
            return indexOf.call( checkContext, elem ) > -1;
        }, implicitRelative, true ),
        matchers = [ function( elem, context, xml ) {
            return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                (checkContext = context).nodeType ?
                    matchContext( elem, context, xml ) :
                    matchAnyContext( elem, context, xml ) );
        } ];

    for ( ; i < len; i++ ) {
        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
            matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
        } else {
            matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

            // Return special upon seeing a positional matcher
            if ( matcher[ expando ] ) {
                // Find the next relative operator (if any) for proper handling
                j = ++i;
                for ( ; j < len; j++ ) {
                    if ( Expr.relative[ tokens[j].type ] ) {
                        break;
                    }
                }
                return setMatcher(
                    i > 1 && elementMatcher( matchers ),
                    i > 1 && toSelector(
                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                        tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                    ).replace( rtrim, "$1" ),
                    matcher,
                    i < j && matcherFromTokens( tokens.slice( i, j ) ),
                    j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                    j < len && toSelector( tokens )
                );
            }
            matchers.push( matcher );
        }
    }

    return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
    var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function( seed, context, xml, results, outermost ) {
            var elem, j, matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                // We must always have either seed elements or outermost context
                elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                // Use integer dirruns iff this is the outermost matcher
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;

            if ( outermost ) {
                outermostContext = context !== document && context;
            }

            // Add elements passing elementMatchers directly to results
            // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
            // Support: IE<9, Safari
            // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
            for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                if ( byElement && elem ) {
                    j = 0;
                    while ( (matcher = elementMatchers[j++]) ) {
                        if ( matcher( elem, context, xml ) ) {
                            results.push( elem );
                            break;
                        }
                    }
                    if ( outermost ) {
                        dirruns = dirrunsUnique;
                    }
                }

                // Track unmatched elements for set filters
                if ( bySet ) {
                    // They will have gone through all possible matchers
                    if ( (elem = !matcher && elem) ) {
                        matchedCount--;
                    }

                    // Lengthen the array for every element, matched or not
                    if ( seed ) {
                        unmatched.push( elem );
                    }
                }
            }

            // Apply set filters to unmatched elements
            matchedCount += i;
            if ( bySet && i !== matchedCount ) {
                j = 0;
                while ( (matcher = setMatchers[j++]) ) {
                    matcher( unmatched, setMatched, context, xml );
                }

                if ( seed ) {
                    // Reintegrate element matches to eliminate the need for sorting
                    if ( matchedCount > 0 ) {
                        while ( i-- ) {
                            if ( !(unmatched[i] || setMatched[i]) ) {
                                setMatched[i] = pop.call( results );
                            }
                        }
                    }

                    // Discard index placeholder values to get only actual matches
                    setMatched = condense( setMatched );
                }

                // Add matches to results
                push.apply( results, setMatched );

                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                if ( outermost && !seed && setMatched.length > 0 &&
                    ( matchedCount + setMatchers.length ) > 1 ) {

                    ueSelector.uniqueSort( results );
                }
            }

            // Override manipulation of globals by nested matchers
            if ( outermost ) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
            }

            return unmatched;
        };

    return bySet ?
        markFunction( superMatcher ) :
        superMatcher;
}

compile = ueSelector.compile = function( selector, match /* Internal Use Only */ ) {
    var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[ selector + " " ];

    if ( !cached ) {
        // Generate a function of recursive functions that can be used to check each element
        if ( !match ) {
            match = tokenize( selector );
        }
        i = match.length;
        while ( i-- ) {
            cached = matcherFromTokens( match[i] );
            if ( cached[ expando ] ) {
                setMatchers.push( cached );
            } else {
                elementMatchers.push( cached );
            }
        }

        // Cache the compiled function
        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

        // Save selector and tokenization
        cached.selector = selector;
    }
    return cached;
};

/**
 * A low-level selection function that works with ueSelector's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with ueSelector.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = ueSelector.select = function( selector, context, results, seed ) {
    var i, tokens, token, type, find,
        compiled = typeof selector === "function" && selector,
        match = !seed && tokenize( (selector = compiled.selector || selector) );

    results = results || [];

    // Try to minimize operations if there is no seed and only one group
    if ( match.length === 1 ) {

        // Take a shortcut and set the context if the root selector is an ID
        tokens = match[0] = match[0].slice( 0 );
        if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                support.getById && context.nodeType === 9 && documentIsHTML &&
                Expr.relative[ tokens[1].type ] ) {

            context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
            if ( !context ) {
                return results;

            // Precompiled matchers will still verify ancestry, so step up a level
            } else if ( compiled ) {
                context = context.parentNode;
            }

            selector = selector.slice( tokens.shift().value.length );
        }

        // Fetch a seed set for right-to-left matching
        i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
        while ( i-- ) {
            token = tokens[i];

            // Abort if we hit a combinator
            if ( Expr.relative[ (type = token.type) ] ) {
                break;
            }
            if ( (find = Expr.find[ type ]) ) {
                // Search, expanding context for leading sibling combinators
                if ( (seed = find(
                    token.matches[0].replace( runescape, funescape ),
                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                )) ) {

                    // If seed is empty or no tokens remain, we can return early
                    tokens.splice( i, 1 );
                    selector = seed.length && toSelector( tokens );
                    if ( !selector ) {
                        push.apply( results, seed );
                        return results;
                    }

                    break;
                }
            }
        }
    }

    // Compile and execute a filtering function if one is not provided
    // Provide `match` to avoid retokenization if we modified the selector above
    ( compiled || compile( selector, match ) )(
        seed,
        context,
        !documentIsHTML,
        results,
        rsibling.test( selector ) && testContext( context.parentNode ) || context
    );
    return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
    // Should return 1, but returns 4 (following)
    return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
    div.innerHTML = "<a href='#'></a>";
    return div.firstChild.getAttribute("href") === "#" ;
}) ) {
    addHandle( "type|href|height|width", function( elem, name, isXML ) {
        if ( !isXML ) {
            return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
        }
    });
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
    div.innerHTML = "<input/>";
    div.firstChild.setAttribute( "value", "" );
    return div.firstChild.getAttribute( "value" ) === "";
}) ) {
    addHandle( "value", function( elem, name, isXML ) {
        if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
            return elem.defaultValue;
        }
    });
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
    return div.getAttribute("disabled") == null;
}) ) {
    addHandle( booleans, function( elem, name, isXML ) {
        var val;
        if ( !isXML ) {
            return elem[ name ] === true ? name.toLowerCase() :
                    (val = elem.getAttributeNode( name )) && val.specified ?
                    val.value :
                null;
        }
    });
}

// EXPOSE
if ( typeof define === "function" && define.amd ) {
    define(function() { return ueSelector; });
// ueSelector requires that there be a global window in Common-JS like environments
} else if ( typeof module !== "undefined" && module.exports ) {
    module.exports = ueSelector;
} else {
    window.ueSelector = ueSelector;
}

// IMPLEMENT

if ( uEdit )
{
    /*uEdit.find          = ueSelector;
    uEdit.expr          = ueSelector.selectors;
    uEdit.expr[":"]     = uEdit.expr.pseudos;
    uEdit.unique        = ueSelector.uniqueSort;
    uEdit.text          = ueSelector.getText;
    uEdit.isXMLDoc      = ueSelector.isXML;
    uEdit.contains      = ueSelector.contains;*/
}

})( uEdit );
;

// Filename: src/ue-widget.js

(function( uEdit )
{
    var store                   = {},

        regexp_magic_fn         = /^__/,

        regexp_private_fn       = /^_/,

        regexp_super_fn         = /\b_super(Apply)?\b/,

        regexp_has_super_fn     = /xyz/.test(function(){xyz;}) ? regexp_super_fn : /.*/,

        base                    = 
        ({
            setOptions              : function( options )
            {
                this.__setOptions( options );

                return this;
            },

            __setOptions            : function( options )
            {
                for ( var key in options )
                {
                    this.setOption( key, options[ key ] );
                }
            },

            setOption               : function( key, value )
            {
                if( typeof this.__setOption === 'function' )
                {
                    this.__setOption( key, value );
                }

                return this;
            },

            __setOption             : function( key, value )
            {
                if( typeof key === 'string' && value !== undefined )
                {
                    this.options[ key ] = value;
                }
            },

            destroy                 : function()
            {
                if( typeof this.__destroy === 'function' )
                {
                    this.__destroy();
                }
            },

            __destroy               : function()
            {
                delete this;
            }
        });

    uEdit.widget    = function( _super_, _name_, _source_ )
    {
        if( !_source_ )
        {
            _source_        = _name_;

            _name_          = _super_;
            
            _super_         = null;
        }

        var _widget         = uEdit.widget,

            _init_          = true,

            _super          = _super_ || function(){},

            _super_proto    = Object.create( _super.prototype ),

            _proto          = Object.create( _super.prototype ),

            _const          = function()
            {
                return function( element, defaults )
                {
                    this.element    = element;

                    //this.options    = this.defaults;

                    if( typeof this.__construct === 'function' )
                    {
                        this.__construct.call( this );
                    }

                    return this;
                };
            }(),

            _extend         = function( source, force )
            {
                if( typeof source === 'function' && source.prototype )
                {
                    source = source.prototype;
                }

                for( var prop_name in source )
                {   
                    _proto[ prop_name ] = ( function( prop_name, prop_value )
                    {
                        return typeof prop_value === 'function' ?
                        ( function( fn )
                        {
                            if( !regexp_has_super_fn.test( fn ) )
                            {
                                return fn;
                            }

                            var _fn             = function()
                                {
                                    return fn.apply( this, arguments );
                                }

                            var _fn_super       = function() 
                                {
                                    if( prop_name === '__construct' && !_super_proto[ prop_name ] )
                                        return _super.apply( this, arguments );
                                    else
                                        return _super_proto[ prop_name ].apply( this, arguments );
                                },
                                _fn_superApply  = function( name, args )
                                {
                                    if( !_super_proto[ name ] )
                                        return console.error( "Super Method [ " + name + " ] doesn't exists" );

                                    if( prop_name === '__construct' && !_super_proto[ prop_name ] )
                                        return _super.apply( this, args );
                                    else
                                        return _super_proto[ name ].apply( this, args );
                                };

                            return function()
                            {   

                                var __self          = this._self,
                                    __super         = this._super,
                                    __superApply    = this._superApply,
                                    value

                                this._self          = _const;
                                this._super         = _fn_super;
                                this._superApply    = _fn_superApply;

                                value               = fn.apply( this, arguments );
                                
                                this._self          = __self;
                                this._super         = __super;
                                this._superApply    = __superApply;

                                return value
                            };
                        })( prop_value ) : prop_value;

                    })( prop_name, source[ prop_name ] );
                };


                return _const;
            };

        _const.extend       = function( source )
        {
            return _extend( source );
        };

        _const.widget       = function( name, source )
        {   
            return _widget( _const, _name_ + name, source );
        };

        _proto.constructor  = _const;

        _const.prototype    = _proto;

        _const.extend( uEdit.merge( _source_, base ) );

        _init_              = false;

        return store[ _name_ ] = _const;
    }

    uEdit.fn( 'widget', function( name, options )
    {
        this.each( function( index, element )
        {
            var widget;

            if( ( widget = store[ name ] ) )
            {
                new widget( element, options );
            }
            else
            {
                throw new Error( 'Widget Error' );
            }
        });
    });
  
})( uEdit );