define(function()
{    
    /**
    * @module ue.store
    * @submodule ue.assets
    */

    _.asset( 'store', function( s, prefix )
    {
        var Store   = function( p )
        {
            this.get        = function( name )
            {
                if( name !== 'get' && name !== 'set' )
                    return this[ p + name ];
                return undefined;
            }

            this.set        = function( name, value )
            {
                if( name !== 'get' && name !== 'set' )
                    return this[ p + name.replace( p, '' ) ] = value;
                return undefined;
            }
        };

        typeof s === 'object' && ( Store.prototype = s );

        return new Store( prefix || '' );
    })
});