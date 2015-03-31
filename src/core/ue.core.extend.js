define(function()
{    
    /**
    * @module ue.core
    * @submodule ue.extend
    */

    _.extend        = function() 
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

        if( typeof target === "string" )
        {
            src             = {};

            src[ target ]   = arguments[ i ];

            return _.extend( src );
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && typeof target !== "function" ) 
        {
            target = {};
        }

        // Extend <@name@> itself if only one argument is passed
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
                    if ( deep && copy && ( typeof copy == 'object' && copy.constructor == Object ) ||
                        ( copyIsArray = ( toString.call( copy ) === '[object Array]' ) ) )
                    {

                        if ( copyIsArray ) 
                        {
                            copyIsArray = false;
                            clone = src && ( toString.call( src ) === '[object Array]' ) ? src : [];

                        } 
                        else 
                        {
                            clone = src && ( typeof src == 'object' && src.constructor == Object ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = _.extend( deep, clone, copy );

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
});