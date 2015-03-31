define
([ 
    "assets/ue.asset.widget/widget.create"
],function( widgetCreate )
{    
	var widgetBase			= widgetCreate( 'Widget',
    {
        version             : '<@version@>',

        template            : '<div></div>',

        options             : 
        {
            disabled        : false,

            visible         : true
        },


        // Magic Methods 

        __initialize            : function( element )
        {
            var self        = this,

                value       = null,

                options     = {}

            this.options    = Object.create( this.options );

            this.element    = element; 

            this.draw       = _.throttle(function()
            {
                if( typeof self.__draw === 'function' )
                    self.__draw();
            },0);

            this.widgets    = {};
        },

        __construct             : function( elem, options )
        {
            this.draw();
        },

        __draw                  : function( template )
        {
            var curelem     = this.element;

            this.element    = _.jq( this.__render( template ) )[ 0 ];

            _.jq( curelem ).replaceWith( this.element );

            _.each( this.widgets, function( widget, hash )
            {
                _.jq( 'widget[hash=' + hash + ']' ).replaceWith( widget.element );

                widget.__draw();
            });

            return this;
        },

        __render                : function( template, options )
        {
            return ( template || this.template ).render( this );
        },

        __setOption             : function( key, value, current )
        {
            if( typeof key === 'string' && value !== undefined )
            {
                _.value( this.options, key, value );
            }
        },

        __setOptions            : function( options )
        {
            for ( var key in options )
            {
                this.setOption( key, options[ key ] );
            }
        },

        widget                  : function()
        {
            return this.element ? this.element : this.__render( null );
        },

        // Public Methods

        setOptions              : function( options )
        {
            this.__setOptions( _.extend( true, this.options, options ) );

            return this;
        },

        setOption               : function( key, value )
        {
            if( typeof this.__setOption === 'function' )
            {
                this.__setOption( key, value, _.value( this.options, key ) );
            }

            return this;
        },

        find                    : function( selector, fn )
        {
            var selectors   = this.options.selectors || {};

            if( _.isArray( selector ) )
                selector    = _.map( selector, function( alias ){ return selectors[ alias ] }, this ).join( ',' );

            if( _.isFunction( selector ) )
                element     = _.jq( selector.call( this ) );
            else
                element     = _.jq( selectors && selectors[ selector ] ? selectors[ selector ] : selector, this.element );

            return fn && fn.call ? fn.call( this, element ) : element;
        },

        html                    : function( html )
        {
            return _.jq( this.element ).html( html );
        },

        clean                   : function()
        {
            return _.jq( this.element ).empty();
        },

        // EVENTS

        on                      : function( type, listener, once )
        {
            _.on( this, type, listener, once );

            return this;
        },

        once                    : function( type, listener )
        {
            _.once( this, type, listener );
            
            return this;
        },

        off                     : function( type, listener )
        {
            _.off( this, type, listener );
            
            return this;
        },

        emit                    : function( type, params )
        {
            return _.emit( this, type, params );
        },

        elink                   : function( obj )
        {
            _.elink( this, obj );
        },

        // SETTERS

        enable                  : function()
        {
            this.setOption( 'disabled', false );

            return this;
        },

        disable                 : function()
        {
            this.setOption( 'disabled', true );

            return this;
        },

        show                    : function()
        {
            this.setOption( 'visible', true );

            return this;
        },

        hide            : function()
        {
            this.setOption( 'visible', false );

            return this;
        },

        toggle                  : function()
        {
            this.setOption( 'visible', !this.options.visible );

            return this;
        },

        // GETTERS

        enabled                 : function()
        {
            return this.options.disabled === false;
        },

        disabled                : function()
        {
            return this.options.disabled === true;
        },

        visible                 : function( value )
        {
            value != null && this.setOption( 'visible', value );

            return this.options.visible === true;
        },

        hidden                  : function( value )
        {
            return this.options.visible === false;
        },

        // DESTROY

        destroy                 : function()
        {
            if( typeof this.__destroy === 'function' )
            {
                this.__destroy();
            }
        },

        __destroy               : function()
        {
            delete this;
        }
    });

	return widgetBase;
});