define
([ 
    "assets/ue.asset.dom/dom.stack"
],function( domStack )
{    
    /**
    * @module ue-widget
    * @submodule ue-script
    */

    domStack.extend
    ({
        /*find        : function()
        {
            _.each( this, function()
            {
                console.
            });
        },*/

        trace           : function( element )
        {
            console.log( this, element );
        }
    })
});