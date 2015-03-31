define(function()
{
    /**
    * @module ue-core
    * @submodule ue-core-utils
    */
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

        now                     : Date.now || function() 
        {
            return new Date().getTime();
        }
    });
});