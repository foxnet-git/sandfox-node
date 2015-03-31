define
([ 
    "core/ue.core",
    "core/ue.core.var",
    "core/ue.core.extend",    
    "core/ue.core.function",
    "core/ue.core.regexp",
    "core/ue.core.number",
    "core/ue.core.string",
    "core/ue.core.object",
    "core/ue.core.array",
    "core/ue.core.collection",
    "core/ue.core.tools",
    "core/ue.core.utils",
    "core/ue.core.events",
    "core/ue.core.asset"
],function()
{
    /**
    * @module ue.core
    */

    var global  = window || global;

    global[ '<@cname@>' ] = global[ '<@name@>' ] = _;

    _.debug( 'ueScript Core Loaded;' );

});