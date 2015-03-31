define(function( _ )
{    
    /**
    * @module ue-widget
    * @submodule ue-script
    */

    _.extend( 'browser',
    {
        isIOS                   : function() 
        {
            return ( ( navigator.userAgent.indexOf( 'iPhone' ) != -1 ) || ( navigator.userAgent.indexOf( 'iPod' ) != -1) || (navigator.userAgent.indexOf( 'iPad' ) != -1 ) );
        },

        isIE                    : function() 
        {
            return /\bMSIE\b/.test( navigator.userAgent );
        },
        isAndroid               : function() 
        {
            return ( navigator.userAgent.indexOf('Android ') != -1 );
        },

        isWindowsDevice         : function() 
        {
            var appVer  = navigator.appVersion;
            
            return ( ( appVer.indexOf( "Win" ) != -1 && (navigator.appVersion.indexOf( "Phone" ) != -1 || navigator.appVersion.indexOf("CE") != -1) ) );
        },

        isMobileDevice          : function() 
        {
            return ( _.isIOS() || _.isAndroid() || _.isWindowsDevice() );
        }
    });
});