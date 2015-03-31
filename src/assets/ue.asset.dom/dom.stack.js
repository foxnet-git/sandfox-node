define
([ 
    "assets/ue.asset.dom/dom.parser",
    "assets/ue.asset.dom/dom.selector"
],function( domParser, domSelector )
{    
    var rquickExpr              = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        docRoot                 = document,

        DomStack                = (function()
        {
            var Array           = function()
                {

                },

                DomStack   	    = function( selector, context )
                {
                    var match, elem;

                    if ( !selector ) 
                        return this;

                    if ( typeof selector === "string" ) 
                    {
                        if( !context || context === document )
                        {
                            match   = selector[0] === "<" &&
                            selector[ selector.length - 1 ] === ">" &&
                            selector.length >= 3 ? [ null, null, null, null, selector ] : rquickExpr.exec( selector );

                            if( match && ( selector = match[ 1 ] ) ) // Handle #ID
                            {
                                if( ( match = document.getElementById( selector ) ) )
                                {
                                    this[ 0 ]   = match;

                                    this.length = 1;
                                }

                                return this;
                            }
                            
                            if( match && ( selector = match[ 2 ] || match[ 3 ] ) ) // Handle TAGNAME || .CLASSNAME
                            {
                                if( ( match = ( match[ 2 ] ? document.getElementsByTagName( selector ) : document.getElementsByClassName( selector ) ) ) && match.length )
                                {
                                    _.merge( this, match );
                                }

                                return this;
                            }
                                
                            if( match && match[ 4 ] ) // Handle <FRAGMENT>
                                console.log( domParser( match[ 4 ] ) );

                            domSelector( selector, context || document, this );
                        }
                    } 
                };

            Array.prototype                 = [];

            DomStack.prototype              = new Array;

            DomStack.prototype.length       = 0;

            DomStack.prototype.extend       =  DomStack.extend = function( source )
            {
                for( var prop in source )
                    DomStack.prototype[ prop ] = (function( fn )
                    {
                        return function( a, b, c, d )
                        {
                            var retValue;

                            if( this instanceof DomStack ) 
                            {
                                _.each( this, function( element )
                                {
                                    retValue = fn.call( this, element, a, b, c, d );
                                });   

                                return retValue || this;
                            }

                            return fn.call( this, null, a, b, c, d );
                        }
                    })( source[ prop ] );
            }

            DomStack.prototype.toString      = function()
            {
                return  this.slice( 0 ).toString();
            };

            DomStack.prototype.constructor   = DomStack;
            
            return  DomStack;

        })()

    return DomStack;

});