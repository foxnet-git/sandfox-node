{% for method in methods %}

ue.{{ method.name }}
-------------------------------

{{ method.description }}

    {% for overload in method.overloads %}

#### ue.{{ method.name }}(`{{ overload.arguments }}`)
{{ overload.description }}

        {% if overload.params %}

> **Párametros**
            
            {% for param in overload.params %}


> **`{{ param.name }}`** ( {{ param.type }} )
>> {{ param.description }}

            {% endfor %}
        
        {% endif %}

        {% if overload.return %}

> **Retorna** ( {{ overload.return.type }} )
>> {{ overload.return.description }}

        {% endif %}

    {% endfor %}

{% if method.example %}


```javascript

{{ method.example }}

```

{% endif %}

- - -

{% endfor %}