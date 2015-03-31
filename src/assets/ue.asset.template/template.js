define
([ 
    "assets/ue.asset.template/template.store",
    "assets/ue.asset.template/template.engine"
],function( templateStore, templateEngine )
{        
    _.extend
    ({
        template        : (function( tengine )
        {
            var template = function( name, template )
                {
                    return templateStore[ name ] = tengine.twig({ data: template });
                }

                template.extend = templateEngine.extend;

            return template;
        })( templateEngine )
    });
});