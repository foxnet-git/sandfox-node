describe( 'Unit: Core-Function', function()
{
    it( 'ue.noop', function()
    {
        var fn      = undefined;

        expect( typeof ue.noop() ).toBe( 'function' );

        expect( ue.noop() instanceof Function ).toBe( true );

        expect( fn || ue.noop() ).toBeDefined();
    });

    it( 'ue.lambda', function()
    {
        expect( ue.lambda( 'x + 1' )( 1 ) ).toBe( 2 );

        for( var i = 0; i < 20; i ++ )
            expect( ue.lambda( 'x * x' )( i ) ).toBe( i * i );
    });

    it( 'ue.prepare', function()
    {
        var fn      = function( a, b, c, d, e )
        {
            return ( this + ( ( a || 0 ) + ( b || 0 ) + ( c || 0 ) + ( d || 0 ) + ( e || 0 ) ) ).toString( 2 );
        }

        expect( ue.prepare( fn, 32 )() ).toBe( '100000' );

        expect( ue.prepare( fn, 32 )( 1 ) ).toBe( '100001' );

        expect( ue.prepare( fn, 32, 1 )( 1, 2 ) ).toBe( '100001' );

        expect( ue.prepare( fn, 32, 4 )( 1, 2, 4, 8 ) ).toBe( '101111' );

        expect( ue.prepare( fn, 32, 4 )( 1, 2, 4, 8, 16 ) ).toBe( '101111' );

        expect( ue.prepare( fn, 32, Infinity )( 1, 2, 4, 8, 16 ) ).toBe( '111111' );
    });

    it( 'ue.iterator', function()
    {
        var collection  = [ { 'foo' : 1, 'bar' : 2 }, { 'foo' : 3, 'bar' : 4 }],

            ite_fn      = ue.iterator( function( value, key, collection )
            {
                return value[ 'foo' ];
            }),

            ite_str     = ue.iterator( 'foo' ),

            ite_obj     = ue.iterator({ 'foo' : 1, 'bar' : 2 });

            for (var i = 0; i < collection.length; i ++ ) 
            {
                expect( ite_fn( collection[ i ], i , collection ) ).toBe( ite_str( collection[ i ], i , collection ) );

                expect( ite_obj( collection[ i ], i , collection ) ).toBe( collection[ i ][ 'foo' ] == 1 && collection[ i ][ 'bar' ] == 2 );
            }
    });


    it( 'ue.negate', function()
    {
        var fn      = function( bool )
        {
            return bool;
        }

        expect( ue.negate( fn )( false ) ).toBe( true );

        expect( ue.negate( fn )( true ) ).toBe( false );
    });
});