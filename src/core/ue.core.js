define(function()
{    
    /**
    * @module ue.script
    * @submodule ue.core
    */

    var
    
    // Main Function <@name@>

    _               = global[ "<@name@>" ] || function( a, b, c, d ) 
    {
        return _.__init && _.__init.call && _.__init.call( _, a, b, c, d );
    };

    // <@name@> Framework Version

    _.version       = '<@version@>';

    // https://github.com/inexorabletash/polyfill/blob/master/polyfill.js
});