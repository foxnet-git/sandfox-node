define(function()
{
    /**
    * @module ue.core
    * @submodule ue.core.function
    */
    
    var 

    regex_ltrim         = /^[\s\uFEFF\xA0]+/g,

    fn_bound            = function( context, fn, arguments ) 
    {
        
    };

    _.extend
    ({
        /**
        * Makes a empty function usefull to set a variable fallback helper.
        * 
        * @method noop()
        * @return {Function} Empty function
        * @example
        *      
        *   var fn = function( callback )
        *   {
        *      return callback || ue.noop();
        *   };
        *   
        *   // Function
        *   fn( null )
        */

        noop                    : function( val )
        {
            return val != null ? function(){ return val } : function(){};
        },

        /**
        * Returns a negated version of the callback function.
        * 
        * @method negate( fn )
        * @param fn {Function} The function to be called
        * @return {Function} Function predicate
        * @example
        *      
        *   var fn = function( )
        *   {
        *      return true;
        *   };
        *   
        *   // true
        *   fn();
        *
        *   // false
        *   negate( fn )();
        *
        */

        negate                  : function( fn, args )
        {
            return function()
            {
                return !fn.apply( this, arguments );
            };
        },

        /**
        * Create a lambda function with the return expresion assigned by parameter.
        * 
        * @method lambda( exp )
        * @param exp {String|Function} Expresion calculate
        * @example
        *      
        *   var sum = ue.lambda( 'x+y' );
        *   
        *   // 2
        *   sum( 1, 1 );
        */

        lambda                  : function( exp )
        {
            return exp instanceof Function ? exp : new Function( 'x', 'y', 'return (' + exp + ')' );
        },

        /**
        * Prepare a callback with fixed arguments checking if context exists.
        * 
        * @method prepare( fn, context, args )
        * @param fn {Function} The function to be called
        * @param context {Object} The `context` used when `fn` is called
        * @param args {Integer} The number of fixed arguments
        * @example
        *      
        *   var context     = [ 1, 2, 3, 4 ],
        *
        *       fn          = ue.prepare( function( index )
        *       {
        *           return this[ index ] * index;
        *       }, context, 1 );
        *      
        *       // 0
        *       fn( 0 );
        * 
        *       // 2
        *       fn( 1 );
        *
        *       // 5
        *       fn( 2 );
        */

        prepare                 : function( fn, context, args ) 
        {
            switch( args )
            {
                case context === void 0: return fn;
                case 1: return function( a ){ return fn.call( context, a ); };
                case 2: return function( a, b ){ return fn.call( context, a, b ); };
                case 3: return function( a, b, c ){ return fn.call( context, a, b, c ); };
                case 4: return function( a, b, c, d ){ return fn.call( context, a, b, c, d ) };
                case 5: return function( a, b, c, d, e ){ return fn.call( context, a, b, c, d, e ) };
                default: return function(){ return fn.apply( context, arguments ); };
            };
        },

        /**
        * Return a iterator function depending by value type.
        * 
        * @method iterator( value [ , context ] )
        * @param value {Object}
        * @param context {Object}
        * @return {Function}
        * @example
        *      
        *   var collection  = [ { 'foo' : 1, 'bar' : 2 }, { 'foo' : 3, 'bar' : 4 }],
        *
        *       ite_fn      = ue.iterator( function( value, key, collection )
        *       {
        *           return value[ 'foo' ];
        *       }),
        *
        *       ite_str     = ue.iterator( 'foo' ),
        *
        *       ite_obj     = ue.iterator({ 'foo' : 1, 'bar' : 2 });
        *
        *       for (var i = 0; i < collection.length; i ++ ) 
        *       {
        *           ite_fn( collection[ i ], i , collection ) // 1 | 3
        *
        *           ite_str( collection[ i ], i , collection ) // 1 | 3
        *
        *           ite_obj( collection[ i ], i , collection ) // true | false
        *       }
        */
        
        iterator                : function( value, context )
        {
            var type    = typeof( value );

            if ( value == null ) 
                return function( value ){ return value };

            if ( type === 'function' )
                return ue.prepare( value, context, 3 );

            if ( type === 'object' )
                return ue.matches( value );

            return ue.property( value );
        },

        /**
        * Crea una función vacia. // TODO
        * 
        * @method noop()
        * @return {Function} Una función vacia
        * @example
        *      
        *   // true
        *   var fn = function( callback )
        *   {
        *      callback     = callback || ue.noop();
        *   };
        */
        
        bind                    : function( fn, context )
        {
            if ( natives.bind && fn.bind === natives.bind ) 
                return natives.bind.apply( fn , slice.call( arguments, 1 ) );

            if ( !typeof fn == 'function' ) 
                throw new TypeError( 'Bind must be called on a function' );

            var args = slice.call( arguments, 2 );

            /*return function bound() 
            {
                return executeBound( func, bound, context, this, args.concat( slice.call(a rguments ) ) );
            };*/

        },

        /**
        * Returns a function, that, when invoked, will only be triggered at most once
        * during a given window of time. Normally, the throttled function will run
        * as much as it can, without ever going more than once per `wait` duration;
        * but if you'd like to disable the execution on the leading edge, pass
        * `{leading: false}`. To disable execution on the trailing edge, ditto.
        *
        * @method throttle( fn, wait [, options] )
        * @param fn {Function} Function that will be invoke
        * @return {Function} Function trigger
        * @example
        *      
        *   var throttled = ue.throttle( updatePosition, 100 );
        * 
        *   ue( window ).on( 'scroll', throttled );
        */
        
        throttle                : function( fn, wait, options )
        {
                options     = options ? options : {};

            var context, args, result,

                timeout     = null,

                previous    = 0;

                later       = function() 
                {
                    previous    = options.leading === false ? 0 : _.now();

                    timeout     = null;

                    result      = fn.apply(context, args);

                    if (!timeout) 
                        context = args = null;
                };

            return function()
            {
                var now         = _.now();
                
                if ( !previous && options.leading === false )
                    previous    = now;

                var remaining   = wait - ( now - previous );

                    context     = this;

                    args        = arguments;

                    if ( remaining <= 0 || remaining > wait ) 
                    {
                        if ( timeout ) 
                        {
                            clearTimeout( timeout );

                            timeout     = null;
                        }
                            previous    = now;

                            result      = fn.apply(context, args);
                        
                        if ( !timeout ) context = args = null;

                    } 
                    else if ( !timeout && options.trailing !== false ) 
                    {
                        timeout = setTimeout( later, remaining );
                    }

                return result;
            };
        },

        thread                  : function( fn, delay, context )
        {
            return new (function()
            {
                (this.launch     = function( d )
                {
                    this._thd = setTimeout( context ? _.prepare( fn, context, Infinity ) : fn, d || delay );
                })( 0 )

                this.kill       = function()
                {
                    clearTimeout( this._thd );
                }
            })()
        },

        interval                : function( fn, delay, context )
        {
            return new (function()
            {
                this.start    = function( d )
                {
                    this._int = setInterval( context ? _.prepare( fn, context, Infinity ) : fn, d || delay );
                }

                this.stop     = function()
                {
                    clearInterval( this._int );
                }

                this.start( 0 );
            })();           
        }
    });
});