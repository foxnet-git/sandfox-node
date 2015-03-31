define(function()
{
    /**
    * @module ue.core
    * @submodule ue.core.event
    */

    var hash        = '__em' + _.hash(),

        Event       = function( type, options )
        {
            if( type instanceof Event )
                return type;

            var ops     = options || {};

            this.type   = type;

            this.timestamp          = _.now();

            this.isActionPrevented  = _.noop( false );

            this.isCallStackStopped = _.noop( false );

            this.isCancellable      = _.noop( !ops.cancellable );

            this.preventAction      = function()
            {
                this.isActionPrevented      = _.noop( true );
            };

            this.stopCallStack      = function()
            {
                this.isCallStackStopped     = _.noop( true );
            };
        };

    _.extend
    ({
        event                   : function( type, options )
        {
            return new Event( type, options );
        },

        emit                    : function( obj, type, params )
        {
            if( obj == null )
                return false;

            if( obj[ hash ] == null )
                return true;

                params          = params || [];

            var cursor          = 0,

                e               = _.event( type ),

                handlers        = obj[ hash ][ e.type] || [],

                count           = handlers.length,

                isCSStopped     = false,

                retValue        = true,

                handler;

            if( !e instanceof Event )
                return console.error( 'Error' );

                params.unshift( e )

            while( !isCSStopped && typeof ( handler = handlers[ count + ( -- cursor ) ] ) == 'function' )
            {
                e.returnValue   = handler.apply( obj, params );

                if( e.returnValue === false )
                {
                    e.preventAction();

                    e.stopCallStack();

                    return false;
                }

                retValue    = !e.isActionPrevented() && retValue;

                isCSStopped = e.isCancellable() && e.isCallStackStopped();
            }

            return retValue;
        },

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

        on                      : function( obj, type, listener, once )
        {
            if( typeof listener === 'object' )
            {
                listener[ hash ] = obj[ hash ];

                return _;
            }

            !obj[ hash ] && ( obj[ hash ] = {} );

            ( !obj[ hash ][ type ] || once ) && ( obj[ hash ][ type ] = [] );
            
            +obj[ hash ][ type ].push( listener );

            return _;
        },

        once                    : function( obj, type, listener )
        {
            return _.on( obj, type, listener, true );
        },

        off                     : function( obj, type, listener )
        {
            obj[ hash ] && obj[ hash ][ type ] && 
            ( listener == null && delete obj[ hash ][ type ] ||
            ( listener = obj[ hash ][ type ].indexOf( listener ) ) !== -1 && obj[ hash ][ type ].splice( listener, 1 ) );

            return _;
        }
    });
});