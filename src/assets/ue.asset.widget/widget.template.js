define
([ 	
    "assets/ue.asset.widget/widget.store"
],function( widgetStore )
{
	_.template.extend(function(Twig) 
    {
        Twig.exports.extendTag
        ({
            /**
             * Set type logic tokens.
             *
             *  Format: {% set key = expression %}
             */
            type: "Twig.logic.type.widget",

            regex: /^widget\s+([a-zA-Z0-9_\.,\s]+)$/,

            next: [ ],

            open: true,

            compile: function ( token ) 
            {
                var widget = token.match[1].trim();

                    token.widget = widget;

                    delete token.match;

                    return token;
            },

            parse: function (token, context, continue_chain) 
            {
                var hash    = _.hash(),

                    template,

                    output  = '[WIDGET_NOT_FOUND]';

                    if( ( widget = widgetStore.get( token.widget ) ) )
                    {
                        context.widgets[ hash ] =  new widget();
                    }

                return {
                    chain: false,

                    output: '<widget uuid="' + hash + '" ></widget>'
                };
            }
        });
    });
});