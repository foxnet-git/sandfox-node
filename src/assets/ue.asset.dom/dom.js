define
([ 
    "assets/ue.asset.dom/dom.stack",
    "assets/ue.asset.dom/dom.traversing"
],function( domStack )
{    
    _.extend
    ({
        __init          : function( selector )
        {
            return new domStack( selector );         
        },

        dom 			: domStack.prototype
    })
});