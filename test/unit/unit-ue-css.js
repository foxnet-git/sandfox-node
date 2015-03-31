describe( 'Unit: Plugin-Css', function()
{
    var div_empty, div_test;

    beforeEach(function() 
    {
        div_empty   = document.createElement( 'DIV' ),

        div_test    = document.createElement( 'DIV' );

        div_test.innerHTML  = '<div style="#FF00FF"></div>';

        document.body.appendChild( div_test );
    });

    afterEach(function() 
    {
        document.body.removeChild( div_test );
    });

    it( 'ue.css', function()
    {
        expect( ue.css( div_empty, 'display', '#FF00FF' ) ).toBe( div_empty.outerHTML.indexOf( 'background-color' ) );

        expect( ue.css( div_empty, 'width', '10px' ) ).toBe( div_empty.outerHTML.indexOf( '10px' ) );
    });/*

    it( 'ue.style', function()
    {
        expect( ue.style( div_empty, 'width', '10px' ) ).toBe( ue.css( div_empty, 'width' ) );
    });*/
});