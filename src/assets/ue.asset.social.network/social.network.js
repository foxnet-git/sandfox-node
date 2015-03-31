define(function( _ )
{    
    /**
    * @module ue-social.network
    * @submodule ue-script
    */

    var controllers             = 
        {
            'facebook'      : 
            {
                'type'      : 'jsonp',

                'request'   : 'https://api.facebook.com/method/links.getStats?urls={{url}}&format=json&callback={{hash}}.{{name}}',

                'share'     : 'https://www.facebook.com/sharer.php?s=100&p[title]={{title}}&p[summary]={{text}}&p[url]={{url}}&p[images][0]={{image}}',

                callback    : function( options, result, fn )
                {
                    fn( result, result[ 0 ].total_count );
                }
            },

            'twitter'       : 
            {
                'type'      : 'jsonp',

                'request'   : 'http://urls.api.twitter.com/1/urls/count.json?url={{url}}&callback={{hash}}.{{name}}',

                'share'     : 'http://twitter.com/share?url={{url}}&text={{title}}',

                callback    : function( options, result, fn )
                {
                    fn( result, result.count );
                }
            },

            'google'        :
            {
                'type'      : 'custom',

                'request'   : 'https://apis.google.com/js/client:plusone.js?onload={{hash}}.{{name}}',

                'share'     : 'https://plus.google.com/share?url={{url}}',

                callback    : function( options, result, fn )
                {

                    loadScript( 'https://apis.google.com/js/client:plusone.js', function( err )
                    {
                        

                        var delay       = 1000,

                            current     = 0,    

                            tries       = 10,

                            interval    = setInterval( function()
                            {
                                if( ( ++ current ) > tries || gapi.client )
                                {
                                    clearInterval( interval );

                                    gapi.client && gapi.client.rpcRequest('pos.plusones.get', 'v1', 
                                    {
                                          nolog         : true,

                                          id            : options.url,

                                          source        : "widget",

                                          userId        : "@viewer",

                                          groupId       : "@self"
                                    })
                                    .execute( function( result ) 
                                    {
                                        fn( result, result.metadata && result.metadata.globalCounts ? result.metadata.globalCounts.count : false );
                                    });
                                }

                            }, delay );
                    });
                }
            },

            'linkedin'      : 
            {
                'type'      : 'jsonp',

                'request'   : 'https://www.linkedin.com/countserv/count/share?url={{url}}&format=jsonp&callback={{ hash }}.{{ name }}',

                'share'     : 'https://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&summary={{text}}&source={{url}}',

                callback    : function( options, result, fn )
                {
                    fn( result, result.count );
                }
            },

            'pinterest'     : 
            {
                'type'      : 'jsonp',

                'request'   : 'https://api.pinterest.com/v1/urls/count.json?url={{url}}&callback={{ hash }}.{{ name }}',

                'share'     : 'https://www.pinterest.com/pin/create/button/?media={{image}}&url={{url}}&description={{text}}',

                callback    : function( options, result, fn )
                {
                    fn( result, result.count );
                }
            }
        },

        defaults                = 
        {
            'networks'  : [ 'twitter', 'facebook', 'google', 'linkedin', 'pinterest' ],

            'url'       : location.protocol + '//' + location.host + location.pathname,

            'title'     : '',

            'text'      : '',

            'image'     : '',

            'callback'  : function()
            {

            },

            'done'      : function()
            {
                return false;
            }
        },

        XMLHttpFactories = 
        [
            function () {return new XMLHttpRequest()},
            function () {return new ActiveXObject("Msxml2.XMLHTTP")},
            function () {return new ActiveXObject("Msxml3.XMLHTTP")},
            function () {return new ActiveXObject("Microsoft.XMLHTTP")}
        ],

        createXMLHTTPObject     = function() 
        {
            var xmlhttp = false;
            for (var i=0;i<XMLHttpFactories.length;i++) {
                try {
                    xmlhttp = XMLHttpFactories[i]();
                }
                catch (e) {
                    continue;
                }
                break;
            }
            return xmlhttp;
        },

        extend                  = function()
        {
            var target  = arguments[0] || {},

                i = 1,

                length  = arguments.length,

                deep    = false,

                options, name, src, copy, copy_is_array, clone;

            // Handle a deep copy situation
            if (typeof target === 'boolean') {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== 'object' && !is.fn(target)) {
                target = {};
            }

            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                options = arguments[i]
                if (options != null) {
                    if (typeof options === 'string') {
                        options = options.split('');
                    }
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && ( typeof copy === 'object' || (copy_is_array = ( copy.length !== undefined ) ))) {
                            if (copy_is_array) {
                                copy_is_array = false;
                                clone = src && (copy.length !== undefined ) ? src : [];
                            } else {
                                clone = src && (typeof copy === 'object') ? src : {};
                            }

                            // Never move original objects, clone them
                            target[name] = extend(deep, clone, copy);

                            // Don't bring in undefined values
                        } else if (typeof copy !== 'undefined') {
                            target[name] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        },

        open_window             = function( url )
        {
            global.open( url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=768,width=1024' );
        },

        eTags                   = function( str, data )
        {
            str && str.length && ( str = str.replace( /\{\{\s?([A-Z0-9\.\_]+)\s?\}\}/ig, function( match, tag )
            {
                return data[ tag ] !== undefined ? encodeURIComponent( data[ tag ] ) : '[TAG_NOT_FOUND:' + tag + ']';
            }));

            return str;
        },

        loadScript             = function( url, callback ) 
        {
            var script          = document.createElement('script');

                script.async    = true;

                script.src      = url;

                script.onload   = function( e )
                {
                    callback && callback.call && callback.call( null, null, e );
                };

                script.onerror  = function( e )
                {
                    callback && callback.call && callback.call( null, '[FAIL_TO_LOAD SCRIPT: ' +url + ']', e );
                };

                document.body.appendChild( script );
        },

        createResult            = function( name, raw, count, request, share )
        {
            return ({
                name        : name  || 'NETWORK_ERROR',

                dataRaw     : raw   || false,

                count       : count || 0,

                request     : request,

                share       : share
            });
        },

        createEvent             = function( controller, status, options )
        {
            return ({
                context : controller,

                type    : controller.type,

                status  : status        || 'ERROR',

                options : options       || {}
            });
        },

        done                    = function( controllers, options, results )
        {
            var ev      = createEvent( controllers, 'DONE', options );

            options.done && 
            options.done.call && 
                options.done.call( controllers, ev, results );

            return true;
        },

        success                 = function( controller, options, result )
        {
            var ev      = createEvent( controller, 'SUCCESS', options );

            options.callback && 
            options.callback.call && 
                options.callback.call( controller, ev, result );

            options.success &&
            options.success.call && 
                options.success.call( controller, ev, result );

            return true;
        },

        error                   = function( controller, options, ex )
        {
            var ev      = createEvent( controller, 'ERROR', options );

            options.callback && 
            options.callback.call && 
                options.callback.call( controller, ev );

            options.error && 
            options.error.call && 
                options.error.call( controller, ev, ex );

            return true;
        };

        _.extend( 'socialNetwork', function( options )
        {
            var i, network,

                hash            = 'CBSN_' + ( Math.random() * 100000 ).toFixed( 0 ),

                results         = {},

                remaining       = 0;

                options         = extend( {}, defaults, options );

                global[ hash ]  = ({});

                for( i = 0; i < options[ 'networks' ].length; i ++ )
                {
                    if( ( network = options[ 'networks' ][ i ] ) )
                    {
                        (function( name )
                        {
                            var controller      = Object.create( controllers[ name ] ),

                                tags            = extend
                                ({ 
                                    name    : ( controller.name = name ),

                                    hash    : hash
                                }, options ),

                                type            = controller.type,

                                request         = controller.request    = eTags( controller.request, tags ),

                                share           = controller.share      = eTags( controller.share, tags ),

                                callback        = controller.callback,

                                handler         = function( result )
                                {
                                    try
                                    {
                                        ( ++ remaining ) && callback( options, result, function( raw, count )
                                        {
                                            success( controller, options, results[ name ] = createResult( name, raw, count, request, share ) ) && ( -- remaining );

                                            remaining == 0 && done( controllers, options, results );
                                            
                                        });
                                    }
                                    catch( ex )
                                    {
                                        error( controller, options, ex ) && ( -- remaining );
                                    }
                                };

                            switch( type )
                            {
                                case 'jsonp':

                                    window[ hash ][ name ] = handler

                                    loadScript( request, function( err )
                                    {
                                        if( err )
                                            error( controller, options, err ) && ( -- remaining );
                                    });

                                break;
                                case 'custom':

                                    handler();

                                break;
                            }
                        })( network );
                    }
                }
        });    
});