define(function()
{
    /**
    * @module ue.core
    * @submodule ue.core.array
    */

    var iteratee    = function( value )
    {
        var type    = typeof( value );

        if ( value == null ) 
            return function( value ){ return value };

        if ( type === 'function' )
            return value;

        if ( type === 'object' )
            return value;

        return function( obj ){ return obj[ value ] };
    };

    _.extend
    ({
        /**
        * Returns the index at which value can be found in the array, or -1 if value is not present in the array. 
        * 
        * @method indexOf( array, value [, isSorted ] )
        * @param array {Array} The array
        * @param value {Object} Value to find in array
        * @param isSorted {Integer} To use a faster binary search set true or set a number to serch after the given index.
        * @return {Integer} -1 if value is not present in the array
        * @example
        *      
        *   var matrix = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        *
        *   // 4
        *   ue.indexOf( matrix, 5 );  
        *
        *   // -1
        *   ue.indexOf( matrix, 10 );
        */

        indexOf                 : function( array, value, isSorted )
        {
            var i = 0, length = array && array.length;

            if (typeof isSorted == 'number') 
            {
                i   = isSorted < 0 ? Math.max( 0, length + isSorted ) : isSorted;
            } 
            else if ( isSorted && length ) 
            {
                i   = _.sortedIndex( array, value );

                return array[ i ] === value ? i : -1;
            }

            for (; i < length; i++) 
                if (array[i] === value) return i;
            return -1;
        },

        /**
        * Uses a binary search to determine the index at which the value should be inserted into the array in order to maintain the array's sorted order. 
        * 
        * @method sortedIndex( array, value [, iterator, context ] )
        * @param array {Array} The array
        * @param iterator {Function} It will be used to compute the sort ranking of each value, including the value you pass.
        * @param context {Object} Custom context to iterator function by default the array.
        * @return {Integer}
        * @example
        *      
        *   var numbers = [ 10, 20, 30, 40, 50 ],
        *
        *       objects = [{x: 10}, {x: 20}, {x: 30}, {x: 40}],
        *
        *       context = {1: 2, 2: 3, 3: 4};
        *
        *   // 3
        *   ue.sortedIndex( numbers, 35 );
        *
        *   // 2
        *   ue.sortedIndex( numbers, 30 );
        *
        *   // 2
        *   ue.sortedIndex( objects, { x: 25 }, function( obj )
        *   {
        *       return obj.x;
        *   })
        *
        *   // 3
        *   ue.sortedIndex( objects, { x: 35 }, 'x' )
        *
        *   // 1
        *   ue.sortedIndex( [ 1, 3 ], 2, function( obj )
        *   { 
        *       return this[ obj ];
        *   }, context );
        */
        
        sortedIndex             : function( array, value, iterator, context ) 
        {
            iterator    = iteratee( iterator );

            var val     = iterator.call( context || array, value ),

                low     = 0,

                high    = array.length;

            while ( low < high ) 
            {
                var mid = low + high >>> 1;

                if ( iterator.call( context || array, array[ mid ] ) < val ) 
                    low     = mid + 1;
                else 
                    high    = mid;
            }

            return low;
        },

        /**
        * Uses a binary search to determine the index at which the value should be inserted into the array in order to maintain the array's sorted order. 
        * 
        * @method sortedIndex( array, value [, iterator, context ] )
        * @param array {Array} The array
        * @param iterator {Function} It will be used to compute the sort ranking of each value, including the value you pass.
        * @param context {Object} Custom context to iterator function by default the array.
        * @return {Integer}
        * @example
        *      
        *   var numbers = [ 10, 20, 30, 40, 50 ],
        *
        *       objects = [{x: 10}, {x: 20}, {x: 30}, {x: 40}],
        *
        *       context = {1: 2, 2: 3, 3: 4};
        *
        *   // 3
        *   ue.sortedIndex( numbers, 35 );
        *
        *   // 2
        *   ue.sortedIndex( numbers, 30 );
        *
        *   // 2
        *   ue.sortedIndex( objects, { x: 25 }, function( obj )
        *   {
        *       return obj.x;
        *   })
        *
        *   // 3
        *   ue.sortedIndex( objects, { x: 35 }, 'x' )
        *
        *   // 1
        *   ue.sortedIndex( [ 1, 3 ], 2, function( obj )
        *   { 
        *       return this[ obj ];
        *   }, context );
        */

        merge: function( first, second ) 
        {
            var len     = +second.length,

                j       = 0,

                i       = first.length;

            for ( ; j < len; j++ ) 
            {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        }
    });
});