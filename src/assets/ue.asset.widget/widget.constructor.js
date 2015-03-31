define
([ 
    "assets/ue.asset.widget/widget.store",
],function( widgetStore )
{
	var widgetConstrutor	= function( name, element, options )
    {
        var Widget;

        <% if debug %>

            _.debug( 'Widget Created: ' + name );

        <% endif %>

        if( ( Widget = widgetStore.get( name ) ) )
            return new Widget( element, options );

        _.error( 'ue.widgetConstructor Error [ Widget_' + name + ' ] doesn\'t exists' );
    };

	return widgetConstrutor;
});