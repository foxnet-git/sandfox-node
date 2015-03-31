define(function()
{
    /**
    * @module ue-core
    * @submodule ue-core-utils
    */
    _.extend
    ({
        /**
        * Returns the number of characters that are in a string, using an integer.
        *
        * @method len( str )
        * @param str {String} The string being measured for length
        * @return {Int} Number of characters
        * @example
        *      
        *   // 7
        *   ue.len( 'foo bar' );
        */

        debug                   : function( msg )
        {
            <% if true %>

                console.log( "[DEBUG] " + msg );

            <% endif %>
        },

        error                   : function( msg )
        {
            <% if true %>

                console.error( "[ERROR] " + msg );

            <% endif %>
        },

        deprecate               : function( ref, message )
        {
            _.debug( "Deprecate: " + msg );

            return ref;
        },

        notYet                  : function( name  )
        {
            return function()
            {
                _.debug( "Method: " + name + " Not yet implemented" );

                return false;
            }
        },
        
        error                   : function( msg ) 
        {
            throw new Error( msg );
        },

        echo                    : function( str )
        {
            console.log( "ECHO: " + str );
        },

        is                      : (function( _ )
        {
            var symbolValueOf   = typeof Symbol === 'function' ? Symbol.prototype.valueOf : null,

                NON_HOST_TYPES  = 
                {
                  boolean: 1,
                  number: 1,
                  string: 1,
                  undefined: 1
                },

                base64Regex     = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/,

                hexRegex        = /^[A-Fa-f0-9]+$/,

                is              = 
                {
                    add             : function( name, fn )
                    {
                        _[ 'is' + ucfirst( name ) ] = _.is[ name ] = fn;
                    },

                    a               : function( value, type )
                    {
                        return typeof value === type;
                    },

                    type            : function( value, type )
                    {
                        return _.a( value, type );
                    },

                    defined         : function ( value ) 
                    {
                        return typeof value !== 'undefined';
                    },

                    empty           : function ( value ) 
                    {
                        var type        = natives.toString.call( value ),

                            key;

                        if ( '[object Array]' === type || '[object Arguments]' === type || '[object String]' === type ) 
                            return value.length === 0;
                        

                        if ('[object Object]' === type) 
                        {
                            for (key in value) 
                            {
                              if ( owns.call( value, key ) ) { return false; }
                            }

                            return true;
                        }

                        return false;
                    },

                    equal           : function ( value, other ) 
                    {
                        var strictlyEqual;

                        if ( ( strictlyEqual = value === other ) ) 
                            return true;
                        
                        var type    = natives.toString.call( value ),

                            key;

                        if ( type !== natives.toString.call( other ) )
                            return false;

                        if ( '[object Object]' === type ) 
                        {
                            for ( key in value ) 
                            {
                                if ( !is.equal(value[key], other[key]) || !( key in other ) ) 
                                    return false;
                            }

                            for ( key in other ) 
                            {
                                if ( !is.equal(value[key], other[key]) || !( key in value ) ) 
                                    return false;
                            }

                            return true;
                        }

                        if ( '[object Array]' === type ) 
                        {
                            key     = value.length;

                            if ( key !== other.length ) 
                              return false;
                            
                            while ( --key ) 
                            {
                                if ( !is.equal( value[ key ], other[ key ] ) )
                                    return false;
                            }

                            return true;
                        }

                        if ( '[object Function]' === type ) 
                            return value.prototype === other.prototype;

                        if ( '[object Date]' === type )
                            return value.getTime() === other.getTime();
                        

                        return strictlyEqual;
                    },

                    hosted          : function ( value, host ) 
                    {
                        var type    = typeof host[ value ];

                        return type === 'object' ? !!host[ value ] : !NON_HOST_TYPES[ type ];
                    },

                    instance        : function ( value, constructor ) 
                    {
                        return value instanceof constructor;
                    },

                    instanceOf      : function ( value, constructor ) 
                    {
                        return is.instance( value, constructor );
                    },

                    null            : function ( value ) 
                    {
                        return value === null;
                    },

                    nil             : function ( value ) 
                    {
                        return is.nil( value );
                    },

                    undefined       : function ( value ) 
                    {
                        return typeof value === 'undefined';
                    },

                    arguments       : function ( value ) 
                    {
                        var isStandardArguments = '[object Arguments]' === natives.toString.call(value);

                            isOldArguments      = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);

                        return isStandardArguments || isOldArguments;
                    },

                    args            : function ( value ) 
                    {
                        return is.arguments( value );
                    },

                    array           : function ( value ) 
                    {
                        return '[object Array]' === natives.toString.call( value );
                    },

                    arraylike       : function ( value ) 
                    {
                        return !!value && !is.boolean(value)
                        && owns.call(value, 'length')
                        && isFinite(value.length)
                        && is.number(value.length)
                        && value.length >= 0;
                    },

                    boolean         : function ( value ) 
                    {
                        return '[object Boolean]' === natives.toString.call(value);
                    },

                    false           : function ( value ) 
                    {
                        return is.boolean( value ) && Boolean( Number( value ) ) === false;
                    },

                    true            : function ( value ) 
                    {
                        return is.boolean( value ) && Boolean( Number( value ) ) === true;
                    },

                    date            : function ( value ) 
                    {
                        return '[object Date]' === natives.toString.call( value );
                    },

                    element         : function ( value ) 
                    {
                        return value !== undefined
                        && typeof HTMLElement !== 'undefined'
                        && value instanceof HTMLElement
                        && value.nodeType === 1;
                    },

                    error           : function ( value ) 
                    {
                        return '[object Error]' === natives.toString.call( value );
                    },

                    function        : function ( value ) 
                    {
                        var isAlert = typeof window !== 'undefined' && value === window.alert;

                        return isAlert || '[object Function]' === natives.toString.call( value );
                    },

                    fn              : function( value )
                    {
                        return is.function( value );
                    },

                    number          : function( value )
                    {
                        return '[object Number]' === natives.toString.call( value );
                    },

                    infinite        : function( value )
                    {
                        return value === Infinity || value === -Infinity;
                    },

                    decimal         : function( value )
                    {
                        return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
                    },

                    divisibleBy     : function ( value, n ) 
                    {
                        var isDividendInfinite  = is.infinite( value ),

                            isDivisorInfinite   = is.infinite( n ),

                            isNonZeroNumber     = is.number( value ) && !isActualNaN( value ) && is.number(n) && !isActualNaN( n ) && n !== 0;

                        return isDividendInfinite || isDivisorInfinite || ( isNonZeroNumber && value % n === 0 );
                    },

                    int             : function( value )
                    {
                        return is.number( value ) && !isActualNaN( value ) && value % 1 === 0;
                    },

                    maximum         : function( value, others )
                    {
                        if ( isActualNaN( value ) ) 
                        {
                            throw new TypeError('NaN is not a valid value');
                        } 
                        else if ( !is.arraylike( others ) ) 
                        {
                            throw new TypeError('second argument must be array-like');
                        }

                        var len = others.length;

                        while ( --len >= 0 ) 
                        {
                            if ( value < others[ len ] )
                                return false;
                        }

                        return true;
                    },

                    minimum         : function( value, others )
                    {
                        if ( isActualNaN( value ) ) 
                        {
                            throw new TypeError('NaN is not a valid value');
                        } 
                        else if (!is.arraylike(others)) 
                        {
                            throw new TypeError('second argument must be array-like');
                        }
                        
                        var len = others.length;

                        while (--len >= 0) 
                        {
                            if (value > others[len]) 
                                return false;
                        }

                        return true;
                    },

                    nan             : function( value )
                    {
                        return !is.number(value) || value !== value;
                    }
                };

                <% for name in [ 'type', 'defined', 'empty', 'equal', 'hosted', 'instance', 'instanceOf', 'null', 'nil', 'undefined', 'arguments', 'args', 'array', 'arraylike', 'boolean', 'false', 'true', 'date', 'element', 'error', 'function', 'fn', 'number', 'infinite', 'decimal', 'divisibleBy', 'int', 'maximum', 'minimum', 'nan' ] %>

                _.extend( 'is<@name|capitalize@>', is[ '<@name@>' ] );

                <% endfor %>

            return is;

        })( _ )
    });
});