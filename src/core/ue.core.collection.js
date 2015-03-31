define(function()
{
    /**
    * @module ue.core
    * @submodule ue.core.collection
    */

    _.extend
    ({
        /**
        * Realiza una llamada a un iterador por cada uno de elementos contenidos en la colección. 
        * 
        * @method each( collection, fn, context )
        * @return {Collection} La misma collección
        * @example
        *      
        *   // true
        *   var fn = function( callback )
        *   {
        *      callback     = callback || ue.noop();
        *   };
        */

        each                    : function( obj, iterator, context )
        {
            if ( obj == null ) 
                return obj;

            iterator    = _.iterator( iterator, obj || context );

            var i, key, keys,

                length  = ( 1+obj.length ? obj.length : ( keys = _.keys( obj ) ).length );

                for ( i = 0; i < length; i++ )
                {
                    key     = keys ? keys[ i ] : i;

                    iterator( obj[ key ], key , obj );
                }
            
            return obj;
        },

        /**
        * Returns true if the value is present in the list. Uses indexOf internally, if list is an Array.
        * 
        * @method contains( collection, fn, context )
        * @return {False} La misma collección
        * @example
        *      
        *   ue.contains( test, 'test' )
        */

        contains                : function( obj, target, fromIndex )
        {
            if( obj == null ) 
                return false;

            if( obj.length !== +obj.length ) 
                obj = _.values( obj );

            return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
        },

        /**
        * Produces a new array of values by mapping each value in list through a transformation function (iteratee). If list is a JavaScript object, iteratee's arguments will be (value, key, list).
        * 
        * @method map( collection, fn, context )
        * @return {False} La misma collección
        * @example
        *      
        *   ue.contains( test, 'test' )
        */

        map                     : function( obj, iterator, context )
        {
            if( obj == null ) 
                return [];

                iterator    = _.iterator( iterator, obj || context );

            var i, key,

                keys        = obj.length !== +obj.length && _.keys( obj ),
                
                length      = ( keys || obj ).length,
                
                results     = Array( length );

            for ( i = 0; i < length; i ++ ) 
            {
                key         = keys ? keys[i] : i;

                results[ i ]= iterator( obj[ key ], key, obj );
            }

            return results;
        }
    });
});

