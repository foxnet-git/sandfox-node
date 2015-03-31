define(function()
{
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

    /**
    * Funcionalidad numerica.
    * @module ue-core
    * @submodule ue-core-number
    */

    var 

    fn_min_max          = function( n1, n2 )
    {
        return { min : Math.min( ( n1 = n1 || 0 ), ( n2 = n2 || 0 ) ), max : Math.max( n1, n2 ) };
    },

    fn_num_cast         = function( num, fn )
    {
        return num == null ?  0 : ( typeof num === 'object' && num.length !== 0 ? fn.apply( _, num ) : parseFloat( num ) )
    };    

    _.extend
    ({
        /**
        * Crea un número aleatorio comprendido entre 0 y 1 en caso de no haber especificado un valor min ni max
        * 
        * @method rand()
        * @return {Float} El número aleatorio comprendido entre 0 y 1
        * @example
        *      
        *   // 0.256878454
        *   ue.rand();
        *   
        *   // 5
        *   ue.rand( 10 );
        *
        *   // 35
        *   ue.rand( 0, 50 );
        */

        /**
        * @method rand( range )
        * @param range {Int} Rango de 0 al número indicado
        * @return {Int} El número aleatorio comprendido entre 0 y el valor indicado en range
        */

        /**
        * @method rand( max, min )
        * @param min {Int} Comienzo del rango
        * @param max {Int} Final del rango
        * @return {Int} El número aleatorio comprendido entre el valor min y el valor max
        */

        rand                    : function( min, max )
        {
            var values  = fn_min_max( min, max );

            return values.min == 0 && values.max == 0 ? Math.random() : Math.floor( Math.random() * ( 1 + values.max - values.min ) + values.min );
        },

        /**
        * Determina si un número es __Par__.
        * 
        * @method even( num )
        * @return {Float} True o False dependiendo si cumple dicha condición
        * @example
        *      
        *   // true
        *   ue.even( 0 );
        *   
        *   // false
        *   ue.even( 1 );
        *
        *   // true
        *   ue.even( 2 );
        */

        even                    : function( num )
        {
            return num % 2 === 0;
        },

        /**
        * Determina si un número es __Impar__.
        * 
        * @method odd( num )
        * @return {Float} True o False dependiendo si cumple dicha condición
        * @example
        *      
        *   // false
        *   ue.odd( 0 );
        *   
        *   // true
        *   ue.odd( 1 );
        *
        *   // false
        *   ue.odd( 2 );
        */

        odd                     : function( num )
        {
            return num % 2 !== 0;
        },

        /**
        * Fija como valores máximo y del número introducido en el parametro `number`. En caso que el número introducido sea mayor que el valor máximo aceptado, devolverá el valor máximo, lo mismo ocurre con el caso contrario.
        * 
        * @method between( min, max, num )
        * @return {Number} El número contenido entre el valor máximo y mínimo
        * @example
        *      
        *   // 5
        *   ue.between( -5, 5, 10 );
        */

        between                 : function( min, max, num )
        {
            var values  = fn_min_max( min, max );

            return Math.min( values.max , Math.max( values.min, num ) );
        },

        /**
        * Recorre todos los argumentos en busca del número menor de la serie.
        * 
        * @method min([ n1, n2, n3, ... ])
        * @return {Number} El número menor de la serie
        * @example
        *      
        *   // - 5
        *   ue.min( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );
        */

        min                     : function()
        {
            var i = 0, min = 0, a = arguments;

            for(; i < a.length; i ++ )
                min = Math.min( fn_num_cast( a[ i ], a.callee ) , min );

            return min;
        },

        /**
        * Recorre todos los argumentos en busca del número mayor de la serie.
        * 
        * @method max([ n1, n2, n3, ... ])
        * @return {Number} El número mayor de la serie
        * @example
        *      
        *   // 9
        *   ue.max( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );
        */

        max                     : function()
        {
            var i = 0, min = 0, a = arguments;

            for(; i < a.length; i ++ )
                min = Math.max( fn_num_cast( a[ i ], a.callee ), min );

            return min;
        },

        /**
        * Recorre todos los argumentos devolviendo el valor medio.
        * 
        * @method avg([ n1, n2, n3, ... ])
        * @return {Number} El número de media de la serie
        * @example
        *      
        *   // 4.194444444444444
        *   ue.avg( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );
        */

        avg                     : function()
        {
            var i = 0, avg = 0, a = arguments;

            for(; i < a.length; i ++ )
                avg += fn_num_cast( a[ i ], a.callee );

            return avg / a.length;
        },

        /**
        * Recorre todos los argumentos devolviendo el valor total de la multiplicación.
        * 
        * @method pow([ n1, n2, n3, ... ])
        * @return {Number} El número resultante de la serie
        * @example
        *      
        *   // -1088640
        *   ue.pow( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );
        */

        pow                     : function()
        {
            var i = 0, pow = 1, a = arguments;

            for(; i < a.length; i ++ )
                pow *= fn_num_cast( a[ i ], a.callee );

            return pow;
        },

        /**
        * Recorre todos los argumentos devolviendo el valor total de la división.
        * 
        * @method div([ n1, n2, n3, ... ])
        * @return {Number} El número resultante de la serie
        * @example
        *      
        *   // -347.1428571428571
        *   ue.div( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );
        */

        div                     : function()
        {
            var i = 0, div = 1, a = arguments;

            for(; i < a.length; i ++ )
                div /= fn_num_cast( a[ i ], a.callee );

            return div;
        },

        /**
        * Recorre todos los argumentos devolviendo el valor total de la suma.
        * 
        * @method sum([ n1, n2, n3, ... ])
        * @return {Number} El número resultante de la serie
        * @example
        *      
        *   // 37
        *   ue.sum( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );
        */

        sum                     : function()
        {
            var i = 0, sum = 0, a = arguments;

            for(; i < a.length; i ++ )
                sum += fn_num_cast( a[ i ], a.callee );

            return sum;
        },

        /**
        * This function has 5 kinds of return values, 1, -1, 0, -0, NaN, which represent "positive number", "negative number", "positive zero",  "negative zero" and NaN respectively.
        * 
        * @method sum([ n1, n2, n3, ... ])
        * @return {Number} El número resultante de la serie
        * @example
        *      
        *   // 37
        *   ue.sum( [ 3, 2, 3 ], [ 4, -5, 6 ], [[ 7, 8 ], 9 ] );
        */

        sign                    : function( x )
        {
            x = +x // convert to a number

            if ( x === 0 || isNaN( x ) )
                return x
            return x > 0 ? 1 : -1
        },

        imul                    : function( a, b ) 
        {
          var ah  = (a >>> 16) & 0xffff;
          var al = a & 0xffff;
          var bh  = (b >>> 16) & 0xffff;
          var bl = b & 0xffff;
          // the shift by 0 fixes the sign on the high part
          // the final |0 converts the unsigned value into a signed value
          return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
        }
    });
});