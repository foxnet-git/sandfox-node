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

        parseHTML               : function( selector, context, results, seed ) 
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
                _.merge( results, context.querySelectorAll(selector) );
            }

            return results;
        },

        buildFragment           : function( elems, context, scripts, selection ) 
        {
            var elem, tmp, tag, wrap, contains, j,

                fragment    = context.createDocumentFragment(),

                nodes       = [],

                i           = 0,

                l           = elems.length;

            for ( ; i < l; i++ ) 
            {
                elem = elems[ i ];

                if ( elem || elem === 0 ) {

                    // Add nodes directly
                    if ( _.type( elem ) === "object" ) {
                        // Support: Android<4.1, PhantomJS<2
                        // push.apply(_, arraylike) throws on ancient WebKit
                        _.merge( nodes, elem.nodeType ? [ elem ] : elem );

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

                        // Support: Android<4.1, PhantomJS<2
                        // push.apply(_, arraylike) throws on ancient WebKit
                        _.merge( nodes, tmp.childNodes );

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
                if ( selection && _.inArray( elem, selection ) !== -1 ) {
                    continue;
                }

                contains = _.contains( elem.ownerDocument, elem );

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
    });
});