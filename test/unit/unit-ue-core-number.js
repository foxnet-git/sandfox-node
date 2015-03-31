describe( 'Unit: Core-Number', function()
{
    it( 'ue.rand', function()
    {
        var rand_null       = ue.rand(),

            rand_bin        = ue.rand( 1 ),

            rand_tri        = ue.rand( 1 , 2 ),

            rand_dec        = ue.rand( 10 );

        expect( rand_null > 0 && rand_null < 1 ).toBe( true );

        expect( rand_bin === 0 || rand_bin === 1 ).toBe( true );

        expect( rand_tri === 0 || rand_tri === 1 || rand_tri === 2 ).toBe( true );

        expect( rand_dec >= 0 && rand_dec <= 10 ).toBe( true );
    });

    it( 'ue.even', function()
    {
        expect( ue.even( 2 ) && ue.even( 4 ) ).toBe( true );

        expect( ue.even( 1 ) && ue.even( 11 ) ).toBe( false );
    });

    it( 'ue.odd', function()
    {
        expect( ue.odd( 13 ) && ue.odd( 3 ) ).toBe( true );

        expect( ue.odd( 12 ) && ue.odd( 20 ) ).toBe( false );
    });

    it( 'ue.between', function()
    {
        for( var i = -10; i <= 10; i ++ )
            expect( ue.between( -5, 5, i ) >=-5 && ue.between( -5, 5, i ) <=5 ).toBe( true );
    });

    it( 'ue.min', function()
    {
        expect( ue.min( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] ) ).toBe( -5 );
    });

    it( 'ue.max', function()
    {
        expect( ue.max( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] ) ).toBe( 9 );
    });

    it( 'ue.avg', function()
    {
        expect( ue.avg( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] ) ).toBe( 4.194444444444444 );
    });

    it( 'ue.sum', function()
    {
        expect( ue.sum( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] ) ).toBe( 37 );
    });

    it( 'ue.pow', function()
    {
        expect( ue.pow( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] ) ).toBe( -1088640 );
    });

    it( 'ue.div', function()
    {
        expect( ue.div( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] ) ).toBe( -347.1428571428571 );
    });
});