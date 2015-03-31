describe( 'Unit: Core-String', function()
{
    it( 'ue.len', function()
    {
        expect( ue.len() ).toBe( 0 );

        expect( ue.len( 'TesT LeNgTh 13' ) ).toBe( 14 );

        expect( ue.len( '' ) ).toBe( 0 );

        expect( ue.len( '1' ) ).toBe( 1 );
    });

    it( 'ue.lower', function()
    {
        expect( ue.lower() ).toBe( '' );

        expect( ue.lower( '' ) ).toBe( '' );

        expect( ue.lower( 'String Must BE LoWeR' ) ).toBe( 'string must be lower' );
    });

    it( 'ue.upper', function()
    {
        expect( ue.upper() ).toBe( '' );

        expect( ue.upper( '' ) ).toBe( '' );

        expect( ue.upper( 'String Must BE LoWeR' ) ).toBe( 'STRING MUST BE LOWER' );
    });

    it( 'ue.ucfirst', function()
    {
        expect( ue.ucfirst() ).toBe( '' );

        expect( ue.ucfirst( '' ) ).toBe( '' );

        expect( ue.ucfirst( 'first letter upper must be upper' ) ).toBe( 'First letter upper must be upper' );
    });

    it( 'ue.uclast', function()
    {
        expect( ue.uclast() ).toBe( '' );

        expect( ue.uclast( '' ) ).toBe( '' );

        expect( ue.uclast( 'last letter upper must be upper' ) ).toBe( 'last letter upper must be uppeR' );
    });

    it( 'ue.lcfirst', function()
    {
        expect( ue.lcfirst() ).toBe( '' );

        expect( ue.lcfirst( '' ) ).toBe( '' );

        expect( ue.lcfirst( 'First letter upper must be lower' ) ).toBe( 'first letter upper must be lower' );
    });

    it( 'ue.lclast', function()
    {
        expect( ue.lclast() ).toBe( '' );

        expect( ue.lclast( '' ) ).toBe( '' );

        expect( ue.lclast( 'last letter upper must be loweR' ) ).toBe( 'last letter upper must be lower' );
    });

    it( 'ue.camelCase', function()
    {
        expect( ue.camelCase() ).toBe( '' );

        expect( ue.camelCase( '' ) ).toBe( '' );

        expect( ue.camelCase( 'test camel case string format' ) ).toBe( 'testCamelCaseStringFormat' );

        expect( ue.camelCase( 'test_camel_case_string_format' ) ).toBe( 'testCamelCaseStringFormat' );

        expect( ue.camelCase( 'test-camel-case-string-format' ) ).toBe( 'testCamelCaseStringFormat' );
    });

    it( 'ue.ltrim', function()
    {
        expect( ue.ltrim() ).toBe( '' );

        expect( ue.ltrim( '' ) ).toBe( '' );

        expect( ue.ltrim( '    trim' ) ).toBe( 'trim' );

        expect( ue.ltrim( 'trim    ' ) ).toBe( 'trim    ' );

        expect( ue.ltrim( '    trim    ' ) ).toBe( 'trim    ' );

        expect( ue.ltrim( '000000trim    ', '0' ) ).toBe( 'trim    ' );

        expect( ue.ltrim( 'footrimbar', 'foo' ) ).toBe( 'trimbar' );

    });

    it( 'ue.rtrim', function()
    {
        expect( ue.rtrim() ).toBe( '' );

        expect( ue.rtrim( '    trim' ) ).toBe( '    trim' );

        expect( ue.rtrim( 'trim    ' ) ).toBe( 'trim' );

        expect( ue.rtrim( '    trim    ' ) ).toBe( '    trim' );

        expect( ue.rtrim( '    trim000000', '0' ) ).toBe( '    trim' );

        expect( ue.rtrim( 'footrimbar', 'bar' ) ).toBe( 'footrim' );

    });

    it( 'ue.trim', function()
    {
        expect( ue.trim() ).toBe( '' );

        expect( ue.trim( '    trim' ) ).toBe( 'trim' );

        expect( ue.trim( 'trim    ' ) ).toBe( 'trim' );

        expect( ue.trim( '    trim    ' ) ).toBe( 'trim' );

    });

    it( 'ue.repeat', function()
    {
        expect( ue.repeat() ).toBe( '' );

        expect( ue.repeat( '' ) ).toBe( '' );

        expect( ue.repeat( 'repeat 5 times', 10 ) ).toBe( 'repeat 5 timesrepeat 5 timesrepeat 5 timesrepeat 5 timesrepeat 5 timesrepeat 5 timesrepeat 5 timesrepeat 5 timesrepeat 5 timesrepeat 5 times' );

        expect( ue.repeat( 'repeat 5 times with glue', 10, '-' ) ).toBe( 'repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue-repeat 5 times with glue' );
    });

    it( 'ue.lpad', function()
    {
        expect( ue.lpad() ).toBe( '' );

        expect( ue.lpad( '' ) ).toBe( '' );

        expect( ue.lpad( 'lpad' ) ).toBe( 'lpad' );

        expect( ue.lpad( 'lpad', 5 ) ).toBe( ' lpad' );

        expect( ue.lpad( 'lpad', 10, '#' ) ).toBe( '######lpad' );
    });

    it( 'ue.rpad', function()
    {
        expect( ue.rpad() ).toBe( '' );

        expect( ue.rpad( '' ) ).toBe( '' );

        expect( ue.rpad( 'rpad' ) ).toBe( 'rpad' );

        expect( ue.rpad( 'rpad', 5 ) ).toBe( 'rpad ' );

        expect( ue.rpad( 'rpad', 10, '#' ) ).toBe( 'rpad######' );
    });
});