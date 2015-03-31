define(function()
{
    /**
    * @module ue-core
    * @submodule ue-core-var
    */

    var proto                   = 
        {
            "object"            : Object.prototype,

            "function"          : Function.prototype,

            "string"            : String.prototype,

            "array"             : Array.prototype,

            "regexp"            : RegExp.prototype,

            "boolean"           : Boolean.prototype,

            "number"            : Number.prototype
        },

        natives                     = 
        {
            'keys'              : Object.keys,

            'bind'              : Function.bind,

            'toString'          : proto.object.toString,

            'hasOwnProperty'    : proto.object.hasOwnProperty
        },

        // All support tests are defined in their respective modules.

        support                 =
        {
            add                 : function( name, value )
            {
                support[ name ] = value;

                return this;
            }
        },

        vars                        = 
        {
            add                 : function( name, value )
            {
                vars[ name ]    = value;

                return this;
            }
        };
});