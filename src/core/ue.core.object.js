define(function()
{
    /**
    * @module ue.core
    * @submodule ue.core.object
    */

    support
        .add( 'bug_has_enum',           !({ 'toString' : null }).propertyIsEnumerable( 'toString' ) )

        .add( 'non_enum_props',         [ 'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor' ] );

    _.extend
    ({
        /**
        * Devuelve un array que contiene todas las claves del objeto. 
        * 
        * @method keys( obj )
        * @return {Integer}
        * @example
        *
        *   // [ "foo", "bar" ]
        *   ue.keys({ foo : "bar", bar : "foo" });
        */

        keys                    : function( obj )
        {
            var keys = [];

            if ( obj == null || typeof obj !== 'object' ) 
                return keys;

            if ( natives.keys ) 
                return natives.keys( obj );

            var keys = [];

            for (var prop in obj) 
                if ( natives.hasOwnProperty.call( obj, prop ) ) 
                    keys.push( prop );
            
            // Ahem, IE < 9.
            if ( support.bug_has_enum )
                for (var i=0; i < support.non_enum_props.length; i++)
                {
                  if ( natives.hasOwnProperty.call( obj, support.non_enum_props[ i ] ) )
                        keys.push( support.non_enum_props[ i ] );
                };

            return keys;
        },

        /**
        * Devuelve un array que contiene todas las claves del objeto. 
        * 
        * @method values( obj )
        * @return {Integer}
        * @example
        *
        *   // [ "foo", "bar" ]
        *   ue.values({ foo : "bar", bar : "foo" });
        */

        values                  : function( obj )
        {
            var keys    = ue.keys( obj ),

                i       = 0,

                length  = keys.length,

                values  = Array( length );

            for (; i < length; i++)
              values[ i ] = obj[ keys[ i ] ];

            return values;
        },

        /**
        * Returns a function that will itself return the value property of object passed by param.
        * 
        * @method property( obj )
        * @param obj {Object}
        * @return {Function}
        * @example
        *
        *   // "item_2"
        *   var json    = 
        *   {
        *       'foo'   :
        *       {
        *           'bar'   :
        *           [
        *               'item_1',
        *               'item_2'
        *           ]
        *       }
        *   };
        *
        *   // 'item_1'
        *   ue.value( json )( "foo.bar.0" );
        *
        *   // 'item_2'
        *   ue.value( json, "foo.bar.1" );
        *
        *   // false
        *   ue.value( json, "foo.bar.1", false );
        */
        
        value                   : function( obj, key, val )
        {
            if( key != null )
                return _.value( obj )( key, val );

            return function( key, val )
            {
                var keys    = key instanceof Array ? key : ( '' + key ).split( /\./ );

                    key     = keys.shift();

                return key == null ? void 0 : keys.length > 0 ? _.value( obj[ key ], keys, val ) : ( val != null ? obj[ key ] = val : obj[ key ] )
            }
        },

        /**
        * Returns a function that will itself return the key property of any passed-in object.
        * 
        * @method property( obj )
        * @param obj {Object}
        * @return {Function}
        * @example
        *
        *   // "item_2"
        *   var json    = 
        *   {
        *       'foo'   :
        *       {
        *           'bar'   :
        *           [
        *               'item_1',
        *               'item_2'
        *           ]
        *       }
        *   };
        *
        *   ue.property( "foo.bar.2" )( json )
        */

        property                : function( key, obj )
        {
            if( obj != null )
                return _.property( key )( obj );

            return function( obj )
            {
                return obj == null ? void 0 : _.value( obj, key );
            };
        },

        xpath                   : (function( P ){

            return function( obj, exp, val )
            {
                var resultType  = val && val.resultType || "VALUE",

                    result      = [],

                    $           = obj;

                if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) 
                {
                    P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
                    return P.result.length ? P.result : false;
                }
            }
        }({
            normalize: function(expr) 
            {
                var subx = [];
                return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0, $1) {
                        return "[#" + (subx.push($1) - 1) + "]";
                    })
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function($0, $1) {
                        return subx[$1];
                    });
            },

            asPath: function(path) 
            {
                var x = path.split(";"),
                    p = "$";
                for (var i = 1, n = x.length; i < n; i++)
                    p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
                return p;
            },

            store: function(p, v) 
            {
                if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
                return !!p;
            },

            trace: function(expr, val, path) 
            {
                if (expr) {
                    var x = expr.split(";"),
                        loc = x.shift();
                    x = x.join(";");
                    if (val && val.hasOwnProperty(loc))
                        P.trace(x, val[loc], path + ";" + loc);
                    else if (loc === "*")
                        P.walk(loc, x, val, path, function(m, l, x, v, p) {
                            P.trace(m + ";" + x, v, p);
                        });
                    else if (loc === "..") {
                        P.trace(x, val, path);
                        P.walk(loc, x, val, path, function(m, l, x, v, p) {
                            typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m);
                        });
                    } else if (/,/.test(loc)) { // [name1,name2,...]
                        for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                            P.trace(s[i] + ";" + x, val, path);
                    } else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                        P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                    else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                        P.walk(loc, x, val, path, function(m, l, x, v, p) {
                        if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m)) P.trace(m + ";" + x, v, p);
                    });
                    else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                        P.slice(loc, x, val, path);
                } else
                    P.store(path, val);
            },

            walk: function(loc, expr, val, path, f) 
            {
                if (val instanceof Array) {
                    for (var i = 0, n = val.length; i < n; i++)
                        if (i in val)
                            f(i, loc, expr, val, path);
                } else if (typeof val === "object") {
                    for (var m in val)
                        if (val.hasOwnProperty(m))
                            f(m, loc, expr, val, path);
                }
            },

            slice: function(loc, expr, val, path) 
            {
                if (val instanceof Array) {
                    var len = val.length,
                        start = 0,
                        end = len,
                        step = 1;
                    loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0, $1, $2, $3) {
                        start = parseInt($1 || start);
                        end = parseInt($2 || end);
                        step = parseInt($3 || step);
                    });
                    start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
                    end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
                    for (var i = start; i < end; i += step)
                        P.trace(i + ";" + expr, val, path);
                }
            },

            eval: function(x, _v, _vname) 
            {
                try 
                {
                    return $ && _v && eval(x.replace(/@/g, "_v"));
                } 
                catch (e) 
                {
                    throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
                }
            }
        })),

        stringify               : function()
        {

        },

        /**
        * Convert an object into a list of [key, value] pairs.
        * 
        * @method property( obj )
        * @param obj {Object}
        * @return {Array}
        * @example
        *
        *   var object    = 
        *   {
        *       "foo"   : 1,
        *       
        *       "bar"   : 2
        *   }
        *
        *   // [ [ "foo", 1 ], [ "bar", 2 ] ]
        *   ue.pairs( object )
        */

        pairs                   : function( obj )
        {
            var i,

                keys        = _.keys( obj ),

                length      = keys.length
            
                pairs       = Array( length );

            for ( i = 0; i < length; i ++ ) 
            {
                pairs[ i ] = [ keys[ i ], obj[ keys[ i ] ] ];
            }
            return pairs;
        },

        /**
        * Convert an object into a list of [key, value] pairs.
        * 
        * @method property( obj )
        * @param obj {Object}
        * @return {Array}
        * @example
        *
        *   var object    = 
        *   {
        *       "foo"   : 1,
        *       
        *       "bar"   : 2
        *   }
        *
        *   // [ [ "foo", 1 ], [ "bar", 2 ] ]
        *   ue.pairs( object )
        */
        
        matches                 : function( attrs, obj ) 
        {
            if( obj )
                return _.matches( attrs )( obj );
            
            var pairs   = _.pairs( attrs ), 

                length  = pairs.length;
            
            return function(obj) 
            {
                if (obj == null) 
                    return !length;
                    
                obj = new Object( obj );

                for ( var i = 0; i < length; i++ ) 
                {
                    var pair = pairs[i], key = pair[0];

                    if (pair[1] !== obj[key] || !(key in obj)) return false;
                }
                return true;
            };
        },

        has                     : function( obj, key )
        {
            return obj != null && natives.hasOwnProperty.call(obj, key);
        }
    });
});