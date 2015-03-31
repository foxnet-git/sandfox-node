define(function()
{    
	var templateStore 		=
	{ 
        get     : function( name )
        {
            return this[ name ] || false;
        },

        set     : function( name, template )
        {
            return this[ name ] = template;
        }
    };

	return templateStore;
});