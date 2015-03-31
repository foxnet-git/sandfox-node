define
([ 
    "assets/ue.asset.widget/widget.base",
    "assets/ue.asset.widget/widget.create",
    "assets/ue.asset.widget/widget.constructor",
    "assets/ue.asset.widget/widget.template"
],function( widgetBase, widgetCreate, widgetConstructor )
{    
    /**
    * @module ue.asset.widget
    * @submodule ue.assets
    */
    
    _.asset( 'widget', (function()
    {
        var widget          = function( parent, name, source )
        {
            return widgetBase.widget( parent, name, source );
        };

        widget.create       = widgetCreate;

        widget.construct    = widgetConstructor;

        widget.version      = "<@version@>";

        return widget;
    })());

});