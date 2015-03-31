define
([ 
    "assets/ue.asset.widget/widget.store",
],function( widgetStore )
{
	var regexp_magic_fn         = /^__/,

        regexp_private_fn       = /^_/,

        regexp_super_fn         = /\b_super(Apply)?\b/,

        regexp_has_super_fn     = /xyz/.test(function(){xyz;}) ? regexp_super_fn : /.*/,

		widgetCreate			= function( _super_, _name_, _source_ )
    {
        if( !_source_ )
        {
            _source_        = _name_;

            _name_          = _super_;
            
            _super_         = null;
        }

        var _widget         = widgetCreate,

            _init_          = true,

            _super          = ( typeof _super_ === 'string' ?  widgetStore.get( _super_ ) : _super_ ) || function(){},

            _super_proto    = _super.prototype,

            _proto          = Object.create( _super.prototype ),

            _const          = function()
            {
                return function( element, options )
                {
                    this.__initialize && this.__initialize.call && this.__initialize.call( this, element );

                    this.__construct && this.__construct.call && this.__construct.call( this, element, options || {} );

                    return this;
                };
            }(),

            _extend         = function( source, force )
            {
                if( typeof source === 'function' && source.prototype )
                {
                    source = source.prototype;
                }

                for( var prop_name in source )
                {   
                    _proto[ prop_name ] = ( function( prop_name, prop_value )
                    {
                        switch( typeof prop_value )
                        {
                            case 'function':
                                return ( function( fn )
                                {
                                    if( !regexp_has_super_fn.test( fn ) )
                                        return fn;

                                    var _fn_super       = function() 
                                        {                                        
                                            return _super_proto[ prop_name ] && _super_proto[ prop_name ].apply( this, arguments );
                                        },

                                        _fn_superApply  = function( name, args )
                                        {
                                            if( !_super_proto[ name ] )
                                                throw new Error( "Super Method [ " + name + " ] doesn't exists" );
                                            
                                            return _super_proto[ name ] && _super_proto[ name ].apply( this, args );
                                        };

                                    return function()
                                    {   

                                        var __self          = this._self,

                                            __super         = this._super,

                                            __superApply    = this._superApply,

                                            value

                                        this._self          = _const;

                                        this._super         = _fn_super;

                                        this._superApply    = _fn_superApply;


                                        value               = fn.apply( this, arguments );
                                        
                                        this._self          = __self;

                                        this._super         = __super;

                                        this._superApply    = __superApply;

                                        // CleanUp Helper Vars
                                        
                                        !this._super && delete this._super;

                                        !this._superApply && delete this._superApply;

                                        !this._self && delete this._self;

                                        return value
                                    };
                                })( prop_value );
                            default:
                                return ( function( value )
                                {
                                    if( prop_name === 'options' )
                                        return _.extend( true, {}, _super_proto.options || {}, value );
                                    if( prop_name === 'template')
                                        return ue.template( _name_, value );
                                    return value;

                                })( prop_value );

                        }

                    })( prop_name, source[ prop_name ] );
                };


                return _const;
            };

        _const.extend       = function( source )
        {
            return _extend( source );
        };

        _const.widget       = function( parent, name, source )
        {   
            if( !source )
            {
                source      = name;

                name        = parent;

                parent      = _const;
            }

            return _widget( parent, _name_ + '_' + name, source );
        };

        _proto.name         = _name_;

        _proto.constructor  = _const;

        _const.prototype    = _proto;

        _const.render       = function( options )
        {
            return _const.prototype.__render.call( _const.prototype, null, options );
        }

        _const.extend( _source_ );

        _init_              = false;

        return widgetStore[ _name_ ] = _const;
    };

	return widgetCreate;
});