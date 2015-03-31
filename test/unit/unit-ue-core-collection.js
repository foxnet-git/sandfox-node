describe( 'Unit: Core-Collection', function()
{
    it( 'ue.each', function()
    {
        var obj     = 
            ({
                'foo'       : 'foo',

                'bar'       : 'bar',

                'false'     : false,

                'null'      : null,

                'foo_bar'   : 'foo_bar',

                'function'  : function(){}
            }),

            arr     =
            ([
                'foo',

                'bar',

                false,

                null,

                'foo_bar',

                function(){}
            ])

        ue.each( obj, function( key, value )
        {
            expect( value ).toBe( obj[ key ] );

            expect( this ).toBe( obj );
        });

        ue.each( arr, function( key, value )
        {
            expect( value ).toBe( arr[ key ] );

            expect( this ).toBe( arr );
        });
    });
});