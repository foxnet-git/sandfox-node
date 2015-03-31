define(function()
{    
    /**
    * @module ue-widget
    * @submodule ue-script
    */

    var regexp_displayswap      = /^(none|table(?!-c[ea]).+)/,

        regexp_margin           = /^margin/,

        regexp_numsplit         = new RegExp( "^(" + vars.pnum + ")(.*)$", "i" ),

        regexp_numnonpx         = new RegExp( "^(" + vars.pnum + ")(?!px)[a-z%]+$", "i" ),

        regexp_relnum           = new RegExp( "^([+-])=(" + vars.pnum + ")", "i" ),

        cssShow                 = { position: "absolute", visibility: "hidden", display: "block" },

        cssNormalTransform      = 
        {
            letterSpacing       : "0",

            fontWeight          : "400"
        },

        cssPrefixes             = [ "Webkit", "O", "Moz", "ms" ],

        cssExpand               = [ "Top", "Right", "Bottom", "Left" ],

        getStyles               = function( elem ) 
        {
            // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            if ( elem.ownerDocument.defaultView.opener ) {
                return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
            }

            return window.getComputedStyle( elem, null );
        },

        curCSS                  = function ( elem, name, computed ) 
        {
            var width, minWidth, maxWidth, ret,
                
                style       = elem.style;

                computed    = computed || getStyles( elem );

            // Support: IE9
            // getPropertyValue is only needed for .css('filter') (#12537)
            if ( computed ) 
            {
                ret = computed.getPropertyValue( name ) || computed[ name ];
            }

            if ( computed ) 
            {

                if ( ret === "" && !_.contains( elem.ownerDocument, elem ) ) 
                {
                    ret = _.style( elem, name );
                }

                // Support: iOS < 6
                // A tribute to the "awesome hack by Dean Edwards"
                // iOS < 6 (at least) returns percentage for a larger set of values,
                // but width seems to be reliably pixels
                // this is against the CSSOM draft spec:
                // http://dev.w3.org/csswg/cssom/#resolved-values
                if ( regexp_numnonpx.test( ret ) && rmargin.test( name ) ) {

                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;

                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;

                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }

            return ret !== undefined ?
                // Support: IE
                // IE returns zIndex value as an integer.
                ret + "" :
                ret;
        },

        // Return a css property mapped to a potentially vendor prefixed property
        vendorPropName          = function ( style, name ) 
        {

            // Shortcut for names that are not vendor prefixed
            if ( name in style ) 
            {
                return name;
            }

            // Check for vendor prefixed names
            var capName         = _.ucfirst( name ),

                origName        = name,

                i               = cssPrefixes.length;

            while ( i-- ) 
            {
                name = cssPrefixes[ i ] + capName;

                if ( name in style ) 
                {
                    return name;
                }
            }

            return origName;
        },

        setPositiveNumber       = function ( elem, value, subtract ) 
        {
            var matches = rnumsplit.exec( value );
            return matches ?
                // Guard against undefined "subtract", e.g., when used as in cssHooks
                Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
                value;
        },

        augmentWidthOrHeight    = function ( elem, name, extra, isBorderBox, styles ) 
        {
            var i = extra === ( isBorderBox ? "border" : "content" ) ?
                // If we already have the right measurement, avoid augmentation
                4 :
                // Otherwise initialize for horizontal or vertical properties
                name === "width" ? 1 : 0,

                val = 0;

            for ( ; i < 4; i += 2 ) {
                // Both box models exclude margin, so add it if we want it
                if ( extra === "margin" ) {
                    val += _.css( elem, extra + cssExpand[ i ], true, styles );
                }

                if ( isBorderBox ) {
                    // border-box includes padding, so remove it if we want content
                    if ( extra === "content" ) {
                        val -= _.css( elem, "padding" + cssExpand[ i ], true, styles );
                    }

                    // At this point, extra isn't border nor margin, so remove border
                    if ( extra !== "margin" ) {
                        val -= _.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                    }
                } else {
                    // At this point, extra isn't content, so add padding
                    val += _.css( elem, "padding" + cssExpand[ i ], true, styles );

                    // At this point, extra isn't content nor padding, so add border
                    if ( extra !== "padding" ) {
                        val += _.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                    }
                }
            }

            return val;
        }

        getWidthOrHeight        = function( elem, name, extra ) 
        {

            // Start with offset property, which is equivalent to the border-box value
            var valueIsBorderBox = true,
                val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles( elem ),
                isBorderBox = _.css( elem, "boxSizing", false, styles ) === "border-box";

            // Some non-html elements return undefined for offsetWidth, so check for null/undefined
            // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
            // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
            if ( val <= 0 || val == null ) {
                // Fall back to computed then uncomputed css if necessary
                val = curCSS( elem, name, styles );
                if ( val < 0 || val == null ) {
                    val = elem.style[ name ];
                }

                // Computed unit is not pixels. Stop here and return.
                if ( regexp_numnonpx.test(val) ) {
                    return val;
                }

                // Check for style in case a browser which returns unreliable values
                // for getComputedStyle silently falls back to the reliable elem.style
                valueIsBorderBox = isBorderBox &&
                    ( support.boxSizingReliable() || val === elem.style[ name ] );

                // Normalize "", auto, and prepare for extra
                val = parseFloat( val ) || 0;
            }

            // Use the active box-sizing model to add/subtract irrelevant styles
            return ( val +
                augmentWidthOrHeight(
                    elem,
                    name,
                    extra || ( isBorderBox ? "border" : "content" ),
                    valueIsBorderBox,
                    styles
                )
            ) + "px";
        }

        showHide                = function( elements, show ) 
        {
            var display, elem, hidden,
                values = [],
                index = 0,
                length = elements.length;

            for ( ; index < length; index++ ) {
                elem = elements[ index ];
                if ( !elem.style ) {
                    continue;
                }

                values[ index ] = dataPriv.get( elem, "olddisplay" );
                display = elem.style.display;
                if ( show ) {
                    // Reset the inline display of this element to learn if it is
                    // being hidden by cascaded rules or not
                    if ( !values[ index ] && display === "none" ) {
                        elem.style.display = "";
                    }

                    // Set elements which have been overridden with display: none
                    // in a stylesheet to whatever the default browser style is
                    // for such an element
                    if ( elem.style.display === "" && isHidden( elem ) ) {
                        values[ index ] = dataPriv.access(
                            elem,
                            "olddisplay",
                            defaultDisplay(elem.nodeName)
                        );
                    }
                } else {
                    hidden = isHidden( elem );

                    if ( display !== "none" || !hidden ) {
                        dataPriv.set(
                            elem,
                            "olddisplay",
                            hidden ? display : _.css( elem, "display" )
                        );
                    }
                }
            }

            // Set the display of most of the elements in a second loop
            // to avoid the constant reflow
            for ( index = 0; index < length; index++ ) {
                elem = elements[ index ];
                if ( !elem.style ) {
                    continue;
                }
                if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                    elem.style.display = show ? values[ index ] || "" : "none";
                }
            }

            return elements;
        },

        addGetHookIf            = function ( conditionFn, hookFn ) 
        {
            // Define the hook, we'll check on the first run if it's really needed.
            return {
                    get: function() {
                        if ( conditionFn() ) 
                        {
                            // Hook not needed (or it's not possible to use it due
                            // to missing dependency), remove it.
                            delete this.get;
                            return;
                        }

                        // Hook needed; redefine it so that the support test is not executed again.
                        return (this.get = hookFn).apply( this, arguments );
                    }
                };
        },

        isHidden                = function( elem, el ) 
        {
            // isHidden might be called from _#filter function;
            // in that case, element will be second argument
            elem = el || elem;
            return _.css( elem, "display" ) === "none" ||
                !_.contains( elem.ownerDocument, elem );
        };

        _.extend
        ({
            /**
            * Returns the number of characters that are in a string, using an integer.
            *
            * @method len( str )
            * @param str {String} The string being measured for length
            * @return {Int} Number of characters
            * @example
            *      
            *   // 7
            *   ue.len( 'foo bar' );
            */

            cssHooks: 
            {
                opacity: 
                {
                    get: function( elem, computed ) {
                        if ( computed ) 
                        {

                            // We should always get a number back from opacity
                            var ret = curCSS( elem, "opacity" );
                            return ret === "" ? "1" : ret;
                        }
                    }
                }/*, #TODO

                marginRight : addGetHookIf
                ( 
                    support.reliableMarginRight,
                    function( elem, computed ) 
                    {
                        if ( computed ) 
                        {
                            return _.swap( elem, { "display": "inline-block" }, curCSS, [ elem, "marginRight" ] );
                        }
                    }
                )*/
            },

            // Don't automatically add "px" to these possibly-unitless properties
            cssNumber: 
            {
                "columnCount"   : true,

                "fillOpacity"   : true,

                "flexGrow"      : true,

                "flexShrink"    : true,

                "fontWeight"    : true,

                "lineHeight"    : true,

                "opacity"       : true,

                "order"         : true,

                "orphans"       : true,

                "widows"        : true,

                "zIndex"        : true,

                "zoom"          : true
            },

            // Add in properties whose names you wish to fix before
            // setting or getting the value
            cssProps: 
            {
                "float"         : "cssFloat"
            },

            // Get and set the style property on a DOM Node
            style               : function( elem, name, value, extra ) {

                // Don't set styles on text and comment nodes
                if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style )
                    return;

                // Make sure that we're working with the right name
                var ret, type, hooks,

                    origName    = _.camelCase( name ),

                    style       = elem.style;

                name = _.cssProps[ origName ] ||
                    ( _.cssProps[ origName ] = vendorPropName( style, origName ) );

                // Gets hook for the prefixed version, then unprefixed version
                hooks = _.cssHooks[ name ] || _.cssHooks[ origName ];

                // Check if we're setting a value
                if ( value !== undefined ) 
                {
                    type = typeof value;

                    // Convert "+=" or "-=" to relative numbers (#7345)
                    if ( type === "string" && ( ret = regexp_relnum.exec( value ) ) ) 
                    {
                        value = ( ret[1] + 1 ) * ret[2] + parseFloat( _.css( elem, name ) );
                        // Fixes bug #9237
                        type = "number";
                    }

                    // Make sure that null and NaN values aren't set (#7116)
                    if ( value == null || value !== value ) 
                    {
                        return;
                    }

                    // If a number, add 'px' to the (except for certain CSS properties)
                    if ( type === "number" && !_.cssNumber[ origName ] ) 
                    {
                        value += "px";
                    }

                    // Support: IE9-11+
                    // background-* props affect original clone's values
                    if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) 
                    {
                        style[ name ] = "inherit";
                    }

                    // If a hook was provided, use that value, otherwise just set the specified value
                    if ( !hooks || !("set" in hooks) ||
                        (value = hooks.set( elem, value, extra )) !== undefined ) 
                    {

                        style[ name ] = value;
                    }

                } else {
                    // If a hook was provided get the non-computed value from there
                    if ( hooks && "get" in hooks &&
                        (ret = hooks.get( elem, false, extra )) !== undefined ) 
                    {

                        return ret;
                    }

                    // Otherwise just get the value from the style object
                    return style[ name ];
                }
            },

            css                 : function( elem, name, extra, styles ) 
            {
                var val, num, hooks,
                    origName = _.camelCase( name );

                // Make sure that we're working with the right name
                name = _.cssProps[ origName ] ||
                    ( _.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

                // Try prefixed name followed by the unprefixed name
                hooks = _.cssHooks[ name ] || _.cssHooks[ origName ];

                // If a hook was provided get the computed value from there
                if ( hooks && "get" in hooks ) {
                    val = hooks.get( elem, true, extra );
                }

                // Otherwise, if a way to get the computed value exists, use that
                if ( val === undefined ) {
                    val = curCSS( elem, name, styles );
                }

                // Convert "normal" to computed value
                if ( val === "normal" && name in cssNormalTransform ) {
                    val = cssNormalTransform[ name ];
                }

                // Make numeric if forced or a qualifier was provided and val looks numeric
                if ( extra === "" || extra ) {
                    num = parseFloat( val );
                    return extra === true || _.isNumeric( num ) ? num || 0 : val;
                }
                return val;
            }
        });

        _.fn && (function( chain )
        {    
            /*chain.extend
            ({
                css             : function( name, value )
                {
                    value != null : 
                }
            });*/
        })( _.fn );

        // Support
        
        support && (function( support, root )
            {
                var pixelPositionVal, boxSizingReliableVal,

                    container   = document.createElement( "div" ),

                    div         = document.createElement( "div" );

                if ( !div.style ) 
                {
                    return;
                }

                // Support: IE9-11+
                // Style of cloned element affects source element cloned (#8908)
                div
                    .style
                    .backgroundClip             = "content-box";
                
                div
                    .cloneNode( true )
                    .style
                    .backgroundClip             = "";

                support.clearCloneStyle         = div.style.backgroundClip === "content-box";

                container.style.cssText         = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
                    "position:absolute";
                container.appendChild( div );

                // Executing both pixelPosition & boxSizingReliable tests require only one layout
                // so they're executed at the same time to save the second computation.
                function computePixelPositionAndBoxSizingReliable() 
                {
                    div.style.cssText =
                        // Support: Android 2.3
                        // Vendor-prefix box-sizing
                        "-webkit-box-sizing:border-box;box-sizing:border-box;" +
                        "display:block;margin-top:1%;top:1%;" +
                        "border:1px;padding:1px;width:4px;position:absolute";

                    div.innerHTML = "";

                    documentElement.appendChild( container );

                    var divStyle                = window.getComputedStyle( div, null );

                        pixelPositionVal        = divStyle.top !== "1%";

                        boxSizingReliableVal    = divStyle.width === "4px";


                    documentElement.removeChild( container );
                }

                window.getComputedStyle && support.add
                ({
                        pixelPosition               : function() 
                        {

                            // This test is executed only once but we still do memoizing
                            // since we can use the boxSizingReliable pre-computing.
                            // No need to check if the test was already performed, though.
                            computePixelPositionAndBoxSizingReliable();

                            return pixelPositionVal;
                        },

                        boxSizingReliable           : function() 
                        {
                            if ( boxSizingReliableVal == null ) 
                            {
                                computePixelPositionAndBoxSizingReliable();
                            }

                            return boxSizingReliableVal;
                        },

                        reliableMarginRight         : function() 
                        {

                            // Support: Android 2.3
                            // Check if div with explicit width and no margin-right incorrectly
                            // gets computed margin-right based on width of container. (#3333)
                            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                            // This support function is only executed once so no memoizing is needed.
                            var ret,

                                marginDiv               = div.appendChild( document.createElement( "div" ) );

                            // Reset CSS: box-sizing; display; margin; border; padding
                            marginDiv.style.cssText     = div.style.cssText =
                                // Support: Android 2.3
                                // Vendor-prefix box-sizing
                                "-webkit-box-sizing:content-box;box-sizing:content-box;" +
                                "display:block;margin:0;border:0;padding:0";

                            marginDiv.style.marginRight = marginDiv.style.width = "0";

                            div.style.width             = "1px";

                            documentElement.appendChild( container );

                            ret                         = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

                            documentElement.removeChild( container );

                            div.removeChild( marginDiv );

                            return ret;
                        }
                });
              
            })( support, this );
});