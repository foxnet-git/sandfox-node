describe( 'Unit: Core-Object', function()
{
    var obj     = 
    ({

        'foo'           : function(){},

        'bar'           : null,

        'foo_bar'       : 1,

        'bar_foo'       : 'bar'
    });

    it( 'ue.keys', function()
    {
        var key, 

            length  = 0,

            i       = 0,

            keys    = ue.keys( obj ); 

        expect( ue.keys({ one : 1, two : 2 }) ).toEqual(['one', 'two']);

        expect( ue.keys( null ) ).toEqual( [] );

        expect( ue.keys( true ) ).toEqual( [] );

        expect( ue.keys( 'a' ) ).toEqual( [] );

        expect( ue.keys( 1 ) ).toEqual( [] );

        expect( keys.length ).toBe( 4 ); 

        for(; i < keys.length; i ++ )
        {
            expect( keys[ i ] in obj ).toBe( true );
        }

        for( key in obj )
        {
            ++ length;

            expect( (function( keys, key  ){
                for( var f = 0; f < keys.length; f ++ )
                    if( keys[ f ] === key )
                        return true;
                return false;
            })( keys, key ) ).toBe( true );
        }

        expect( keys.length === length ).toBe( true );

    });

    it( 'ue.has', function()
    {
        expect( ue.has( obj ) ).toBe( false );

        expect( ue.has() ).toBe( false );

        expect( ue.has( obj, 'foo' ) ).toBe( true );

        expect( ue.has( obj, 'oof' ) ).toBe( false );
    });

    it( 'ue.pairs', function()
    {
        expect( ue.pairs({ one: 1, two: 2 }) ).toEqual([[ 'one', 1 ], [ 'two', 2 ]]);

        expect( ue.pairs({one: 1, two: 2, length: 3}) ).toEqual([[ 'one', 1 ], [ 'two', 2 ], [ 'length', 3 ]]);
    });

    it( 'ue.property', function()
    {
        expect( ue.property( 'foo' )({ 'foo' : 'bar' }) ).toBe( 'bar' );

        expect( ue.property( 0 )([ 'foo', 'bar' ]) ).toBe( 'foo' );
    });

    it( 'ue.matches', function()
    {
        var attr    = 
            { 
                'selected'  : true, 

                'disable'   : false 
            },

            foo     = 
            {
                'foo'       : 'bar',

                'selected'  : true, 

                'disable'   : false 
            },

            bar     = 
            {
                'bar'       : 'foo',
                
                'selected'  : false, 

                'disable'   : true 
            };

        expect( ue.matches( attr, foo ) ).toBe( true );

        expect( ue.matches( attr )( foo ) ).toBe( true );

        expect( ue.matches( attr, bar ) ).toBe( false );

        expect( ue.matches( attr )( bar ) ).toBe( false );
    });

    
});