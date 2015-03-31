describe( 'Unit: Plugin-Widget', function()
{    
    var wfoo    = ue.widget( 'wfoo', 
    {
        __construct      : function()
        {
            console.log( 'wfoo' );
        }
    }),

    wbar    = ue.widget( wfoo, 'wbar', 
    {
        __construct      : function()
        {
            this._super();

            console.log( 'wbar' );
        }
    }),

    nwfoo   = new wfoo( document.body, { 'hiden' : false, 'enabled' : true, 'deep' : { 'shallow' : true } }),

    nwbar   = new wbar( document.body, { 'hiden' : false, 'enabled' : false, 'deep' : { 'shallow' : false } });

    it( 'widget.heritance', function()
    {
        expect( nwbar instanceof wbar && nwbar instanceof wfoo ).toBe( true );
    });

    /*it( 'widget.options', function()
    {
        expect( nwfoo.options.hiden ).toBe( false );

        expect( nwbar.options.hiden ).toBe( false );

        expect( nwfoo.options.enabled ).toBe( true );

        expect( nwbar.options.enabled ).toBe( false );
    });

    it( 'widget.setOption', function()
    {
        nwfoo.setOption( 'test', true );

        nwbar.setOption( 'test', false );

        expect( nwfoo.options.test ).toBe( true );

        expect( nwbar.options.test ).toBe( false );
    });

    it( 'widget.setOptions', function()
    {
        nwfoo.setOption( 'test', true );

        nwbar.setOption( 'test', false );

        expect( nwfoo.options.test ).toBe( true );

        expect( nwbar.options.test ).toBe( false );
    });*/
});