define(function()
{
    /**
    * @module ue.core
    * @submodule ue.core.regexp
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

        regexp              	: ( function()
        {
        	var rg 				= function( pattern, flags )
        	{
        		this._rg 	= new RexExp( pattern, flags );
        	};

        	rg.prototype.exec 	= function( str )
        	{
        		
        	};

        	rg.union 			= function( pattern, flags )
        	{
        		var parts 				= /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,

		            output 				= [],

		            numCaptures 		= 0,

		            numPriorCaptures,

		            captureNames,

		            pattern,

		            rewrite 			= function( match, paren, backref ) 
		            {
		                var name = captureNames[numCaptures - numPriorCaptures];

		                // Capturing group
		                if (paren) {
		                    ++numCaptures;
		                    // If the current capture has a name, preserve the name
		                    if (name) {
		                        return '(?<' + name + '>';
		                    }
		                // Backreference
		                } else if (backref) {
		                    // Rewrite the backreference
		                    return '\\' + (+backref + numPriorCaptures);
		                }

		                return match;
		            },
		            i;

		        if ( !(isType(patterns, 'Array') && patterns.length) ) 
		        {
		            throw new TypeError('Must provide a nonempty array of patterns to merge');
		        }

		        for ( i = 0; i < patterns.length; ++i ) 
		        {
		            pattern = patterns[ i ];

		            if (self.isRegExp( pattern ) ) 
		            {
		                numPriorCaptures = numCaptures;

		                captureNames = (pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames) || [];

		                // Rewrite backreferences. Passing to XRegExp dies on octals and ensures patterns
		                // are independently valid; helps keep this simple. Named captures are put back
		                output.push(nativ.replace.call(self(pattern.source).source, parts, rewrite));

		            } 
		            else 
		            {
		                output.push( self.escape( pattern ) );
		            }
		        }

		        return self( output.join( '|' ), flags );
        	}

        	return rg;
        })()
    });
});