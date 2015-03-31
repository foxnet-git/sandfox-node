define(function()
{    
	var widgetStore 		=
	{ 
        get     : function( name )
        {
            return this[ 'Widget_' + name ] || false;
        },

        set     : function( name, widget )
        {
            return this[ name ] = widget;
        }
    };

	return widgetStore;
});