/**
    * @module ue-widget
    * @submodule ue-script
    */

     var    rquickExpr      = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

            rootContext,

            hasDuplicate,
            
            docElem         = window.document.documentElement,

            matches         = docElem.matches ||
                                docElem.webkitMatchesSelector ||
                                docElem.mozMatchesSelector ||
                                docElem.oMatchesSelector ||
                                docElem.msMatchesSelector,

            sortOrder       = function( a, b ) 
            {
                // Flag for duplicate removal
                if ( a === b ) {
                    hasDuplicate = true;
                    return 0;
                }

                var compare = b.compareDocumentPosition &&
                                a.compareDocumentPosition &&
                                a.compareDocumentPosition( b );

                if ( compare ) {
                    // Disconnected nodes
                    if ( compare & 1 ) {

                        // Choose the first element that is related to our document
                        if ( a === document || _.dom.contains( document, a ) ) {
                            return -1;
                        }
                        if ( b === document || _.dom.contains( document, b ) ) {
                            return 1;
                        }

                        // Maintain original order
                        return 0;
                    }

                    return compare & 4 ? -1 : 1;
                }

                // Not directly comparable, sort on existence of method
                return a.compareDocumentPosition ? -1 : 1;
            },

            

    _.extend
    ({
        __init          : function( selector )
        {
            return new Dom( selector );            
        },

        dom             : Dom.prototype,

        parseHTML       : function( data, context, keepScripts ) 
        {
            if ( typeof data !== "string" )
                return [];

            if ( typeof context === "boolean" ) 
            {
                keepScripts = context;
                context = false;
            }
            // document.implementation stops scripts or inline event handlers from
            // being executed immediately
            context = context || ( support.createHTMLDocument ?
                document.implementation.createHTMLDocument( "" ) :
                document );

            var parsed      = rsingleTag.exec( data ),

                scripts     = !keepScripts && [];

            // Single tag
            if ( parsed ) 
                return [ context.createElement( parsed[ 1 ] ) ];

            parsed = jQuery.buildFragment( [ data ], context, scripts );

            /*if ( scripts && scripts.length ) // #TODO
            {
                jQuery( scripts ).remove();
            }*/

            return _.merge( [], parsed.childNodes );
        },

        find            : (function()
        {
            var find            = function( selector, context, results, seed ) 
            {
                var elem, nodeType,

                    i   = 0;

                results = results || [];

                context = context || document;

                // Same basic safeguard as Sizzle
                if ( !selector || typeof selector !== "string" ) 
                {
                    return results;
                }

                // Early return if context is not an element or document
                if ( ( nodeType = context.nodeType ) !== 1 && nodeType !== 9 ) 
                {
                    return [];
                }

                if ( seed ) 
                {
                    while ( ( elem = seed[ i++ ] ) ) 
                    {
                        if ( _.find.matchesSelector( elem, selector ) ) 
                        {
                            results.push( elem );
                        }
                    }
                } 
                else 
                {
                    _.merge( results, context.querySelectorAll( selector ) );
                }

                return results;
            };

            find.matches            = function( expr, elements ) 
            {
                return _.find( expr, null, null, elements );
            };

            find.matchesSelector    = function( elem, expr ) 
            {
                return matches.call( elem, expr );
            };

            find.attr               = function( elem, name )
            {
                return elem.getAttribute( name );
            }

            return find;
        })()
    });

    _.dom.extend
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

        find                    : function( elem, selector, context )
        {
            if( !elem )
                return _.find( selector, context );

            return _.find( selector, elem, this );
        },

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

        unique                      : function( results ) 
        {
            var elem,

                duplicates  = [],

                i           = 0,

                j           = 0;

            hasDuplicate    = false;

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

            return results;
        },

        text                        : function( elem ) 
        {
            var node,

                ret         = "",

                i           = 0,

                nodeType    = elem.nodeType;

            if ( !nodeType ) 
                while ( (node = elem[i++]) ) 
                    ret += jQuery.text( node );
            else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) 
                return elem.textContent;
            else if ( nodeType === 3 || nodeType === 4 ) 
                return elem.nodeValue;

            return ret;
        },

        isXMLDoc                    : function( elem ) 
        {
            return ( elem.ownerDocument || elem ).documentElement.nodeName !== "HTML";
        },

        isDomStack                  : function()
        {

        }
    });





// Handle HTML strings
        if ( typeof selector === "string" ) {
            if ( selector[0] === "<" &&
                selector[ selector.length - 1 ] === ">" &&
                selector.length >= 3 ) {

                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [ null, selector, null ];

            } else {
                match = rquickExpr.exec( selector );
            }

            // Match html or make sure no context is specified for #id
            if ( match && (match[1] || !context) ) {

                // HANDLE: $(html) -> $(array)
                if ( match[1] ) {
                    context = context instanceof jQuery ? context[0] : context;

                    // Option to run scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    jQuery.merge( this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ) );

                    // HANDLE: $(html, props)
                    if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                        for ( match in context ) {
                            // Properties of context are called as methods if possible
                            if ( jQuery.isFunction( this[ match ] ) ) {
                                this[ match ]( context[ match ] );

                            // ...and otherwise set as attributes
                            } else {
                                this.attr( match, context[ match ] );
                            }
                        }
                    }

                    return this;

                // HANDLE: $(#id)
                } else {
                    elem = document.getElementById( match[2] );

                    if ( elem ) {
                        // Inject the element directly into the jQuery object
                        this[0] = elem;
                        this.length = 1;
                    }
                    return this;
                }

            // HANDLE: $(expr, $(...))
            } else if ( !context || context.jquery ) {
                return ( context || rootjQuery ).find( selector );

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
            } else {
                return this.constructor( context ).find( selector );
            }

        // HANDLE: $(DOMElement)
        } else if ( selector.nodeType ) {
            this[0] = selector;
            this.length = 1;
            return this;

        // HANDLE: $(function)
        // Shortcut for document ready
        } else if ( jQuery.isFunction( selector ) ) {
            return rootjQuery.ready !== undefined ?
                rootjQuery.ready( selector ) :
                // Execute immediately if ready is not present
                selector( jQuery );
        }

        return jQuery.makeArray( selector, this );