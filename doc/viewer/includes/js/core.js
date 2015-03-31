+(function( factory )
{
    if( define.amd )
        return define( 'DocViewer', factory } );

    return new factory();

})(function()
{
    this.loadFile           = function( name, callback )
    {
        $.ajax
        ({
            url         : name

        })
        .done(function( data ) 
        {
            callback.call( this, marked( data ) );
        });
    }
})