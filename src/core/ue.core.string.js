define(function()
{
    /**
    * @module ue-core
    * @submodule ue-core-string
    */

    vars
        .add( 'regex_whitespaces',      new RegExp( '[\\s\\uFEFF\\xA0]+' ) )

        .add( 'regex_ltrim',            new RegExp( '^' + vars.regex_whitespaces.source , 'g' ) )

        .add( 'regex_rtrim',            new RegExp( vars.regex_whitespaces.source + '$', 'g' ) )

        .add( 'regex_trim',             new RegExp( vars.regex_ltrim.source + '|' + vars.regex_rtrim.source, 'g' ) )

        .add( 'regex_dash_alpha',       new RegExp( '[-\\s+\\_]([\\da-z])', 'gi' ) );

    
    var regex_mask          = function( chars, rg, flags )
    {
        if( typeof chars == 'string' )
            chars = [ chars ];

        return chars instanceof RegExp ? chars : new RegExp( rg.replace( /\$([0-9]+|\*)/g, function( match, index )
        {
            return ( index === '*' ? chars.join( '|' ) : chars[ index ] ) || new Error( 'Error RegExp value at ' + index + ' in [ ' + chars.join( ',' ) + ' ] not found' );
        }), flags );
    };

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

        len                     : function( str )
        {
            return str ? str.length || 0 : 0;
        },

        /**
        * Make a string's all characters lowercase.
        *
        * @method lower( str )
        * @param str {String} The input string
        * @return {String} Returns the resulting string
        * @example
        *      
        *   // foo bar
        *   ue.lower( 'FoO BaR' );
        */

        lower                   : function( str )
        {
            return str != null ? ( str + '' ).toLowerCase() : '';
        },

        /**
        * Make a string's all characters uppercase.
        *
        * @method upper( str )
        * @param str {String} The input string
        * @return {String} Returns the resulting string
        * @example
        *      
        *   // FOO BAR
        *   ue.upper( 'FoO BaR' );
        */

        upper                   : function( str )
        {
            return str != null ? ( str + '' ).toUpperCase() : '';
        },

        /**
        * Make a string's first character uppercase.
        *
        * @method ucfirst( str )
        * @param str {String} The input string.
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // Foo bar
        *   ue.ucfirst( 'foo bar' );
        */

        ucfirst                 : function( str )
        {
            return str != null ? ( str = str + '' ).charAt( 0 ).toUpperCase() + str.slice( 1 ) : '';
        },

        /**
        * Make a string's last character uppercase.
        *
        * @method uclast( str )
        * @param str {String} The input string.
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // foo baR
        *   ue.uclast( 'foo bar' );
        */

        uclast                  : function( str )
        {
            return str != null ? ( str = str + '' ).substring( 0, str.length - 1 ) + str.charAt( str.length - 1 ).toUpperCase() : '';
        },

        /**
        * Make a string's first character lowercase.
        *
        * @method lcfirst( str )
        * @param str {String} The input string
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // fOO BAR
        *   ue.lcfirst( 'FOO BAR' );
        */

        lcfirst                 : function( str )
        {
            return str != null ? ( str = str + '' ).charAt( 0 ).toLowerCase() + str.slice( 1 ) : '';
        },

        /**
        * Make a string's last character lowercase.
        *
        * @method lclast( str )
        * @param str {String} The input string
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // FOO BAr
        *   ue.lcfirst( 'FOO BAR' );
        */

        lclast                  : function( str )
        {
            return str != null ? ( str = str + '' ).substring( 0, str.length - 1 ) + str.charAt( str.length - 1 ).toLowerCase() : '';
        },

        /**
        * 
        *
        * @method camelCase( str )
        * @param str {String} The input string
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // fooBar
        *   ue.camelCase( 'foo bar' );
        */

        camelCase               : function( str ) 
        {
            return str != null ? ( str + '' ).replace( vars.regex_dashAlpha, function( all, letter ) 
            {
                return letter.toUpperCase();
            }) : '';
        },

        /**
        * Strip whitespace (or other characters set by second parameter) from the beginning of a string.
        *
        * @method ltrim( str [, chars ] )
        * @param str {String} The input string
        * @param chars {Array|String} Chars to be delete
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // foo
        *   ue.ltrim( '    foo' );
        */

        ltrim                    : function( str, chars )
        {
            return str != null ? ( str + '' ).replace( regex_mask( chars || vars.regex_ltrim, '^[$*]+', 'g' ), '' ) : '';
        },

        /**
        * Strip whitespace (or other characters set by second parameter) from the end of a string.
        *
        * @method rtrim( str )
        * @param str {String} The input string
        * @param chars {Array|String} Chars to be delete
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // foo
        *   ue.rtrim( 'foo   ' );
        */

        rtrim                    : function( str, chars )
        {
            return str != null ? ( str + '' ).replace( regex_mask( chars || vars.regex_rtrim, '[$*]+$', 'g' ), '' ) : '';
        },

        /**
        * Strip whitespace (or other characters set by second parameter) from the beginning and end of a string.
        *
        * @method trim( str )
        * @param str {String} The input string
        * @param chars {Array|String} Chars to be delete
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // foo
        *   ue.trim( '   foo   ' );
        */

        trim                    : function( str, chars )
        {
            return str != null ? ( str + '' ).replace( regex_mask( chars || vars.regex_trim, '/^[$*]+|[$*]+$/g', 'g' ), '' ) : '';
        },

        /**
        * Repeat a string __N__ times.
        *
        * @method repeat( str, num [, glue ] )
        * @param str {String} The string to be repeated
        * @param num {Integer} Number of time the input string should be repeated
        * @return {String} Returns the repeated string
        * @example
        *      
        *   // foofoo
        *   ue.repeat( 'foo', 2 );
        *  
        *   // foobarfoo
        *   ue.repeat( 'foo', 2, 'bar' );
        */

        repeat                  : function( str, num, glue )
        {
            if( str == null )
                return '';

            if( !glue && str.repeat )
                return str.repeat( num );

            for( var i = 1, g = glue || '', s = str; i < num; i ++ )
                s += g + str;

            return s;
        },

        /**
        * Pad a string from the beginning to a certain length with another string.
        *
        * @method lpad( str, len [, pad ] )
        * @param str {String} The input string
        * @param len {Integer} The input string
        * @param pad {String} The input string
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // ###foo
        *   ue.lpad( 'foo', 6, '#' );
        */

        lpad                    : function( str, len, pad ) 
        {
            if( str == null )
                return '';

            pad = pad || ' ';

            while ( str.length < len )
                str = pad + str;
            return str;
        },

        /**
        * Pad a string from the end to a certain length with another string.
        *
        * @method rpad( str, num [, glue ] )
        * @param str {String} The input string
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // ###foo
        *   ue.lpad( 'foo', 6, '#' );
        */

        rpad                    : function( str, len, pad )
        {
            if( str == null )
                return '';
            
            pad = pad || ' ';

            while ( str.length < len )
                str = str + pad;
            return str;
        },
        
        /**
        * Pad a string from the beginning and end to a certain length with another string.
        *
        * @method pad( str, num [, glue ] )
        * @param str {String} The input string
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // ###foo
        *   ue.lpad( 'foo', 6, '#' );
        */

        pad                     : function( str, len, pad ) // CHECK
        {
            pad = pad || ' ';

            while ( str.length < len )
                str = pad + str + pad;
            return str;
        },

         /**
        * Pad a string from the beginning and end to a certain length with another string.
        *
        * @method pad( str, num [, glue ] )
        * @param str {String} The input string
        * @return {String} Returns the resulting string.
        * @example
        *      
        *   // ###foo
        *   ue.lpad( 'foo', 6, '#' );
        */

        ascii                   : function( code )
        {
            var i, res     = '';

            for( i = 0; i < arguments.length; i ++ )
            {
                res += String.fromCharCode( arguments[ i ] )
            }

            return res;
        },

        hash                    : function( len, chars )
        {
                chars   = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var strlen  = chars.length,
                hash    = '', i = 0;
                len     = len || 10;
            
            for ( ; i < len; i ++ ) 
            {
                hash += chars.charAt( _.rand( 0, strlen - 1 ) );
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
});