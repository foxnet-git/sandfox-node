define(function()
{    
    /**
    * @module ue.core
    * @submodule ue.core.asset
    */

    _.asset        	= function( name, source ) 
    {
        _.extend( name, _.assets[ name ] = source );
    }

    _.assets 		= {};
});