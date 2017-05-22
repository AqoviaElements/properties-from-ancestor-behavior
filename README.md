![Bower version](https://img.shields.io/bower/v/properties-from-ancestor-behavior.svg)
[![Build status](https://travis-ci.org/AqoviaElements/properties-from-ancestor-behavior.svg?branch=master)](https://travis-ci.org/AqoviaElements/properties-from-ancestor-behavior)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/AqoviaElements/properties-from-ancestor-behavior)

_[Demo and API docs](https://www.webcomponents.org/element/AqoviaElements/properties-from-ancestor-behavior)_

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="./demo/example-ancestor-component.html">
    <link rel="import" href="./demo/example-descendant-component.html">
    <style>
      papyrus-details { font-family: Roboto; background-color: #ddd; padding: 1em; border-radius: 4px; } 
      summary { font-size: 120%; font-weight: bold; }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
```html
    <example-ancestor-component my-prop1="Initial Value" my-prop2="Initial Value">
        <div>
            <example-descendant-component></test-descendant-component>
        </div>
        <div>
            <example-descendant-component></test-descendant-component>
        </div>
    </example-ancestor-component>
```
-->


## PropertiesFromAncestorBehavior

Behavior for a web component to take a property value from the closest ancestor that has it. Supports change events.

Such a tool can be useful for ubiquitous properties (think language of the UI, currency, etc.) which would otherwise pollute attributes of every component with same boilerplate expression, or force usage of a global variable (usually without binding to changes).

### Usage:

Technically, it's a behavior factory function. To have a behavior instance created, you call the `PropertiesFromAncestorBehavior()`.
```JavaScript
Polymer({
    is: 'example-descendant-component',
    behaviors: [
        PropertiesFromAncestorBehavior({
            myProp1: {
                    /// If no ancestor with value is found, `defaultValue` will to be used
                    ///   (don't use the polymer's 'value:' for this, because it would unnecessarily set this value that during initialization, while it might be different from that of the ancestor
                defaultValue: 123,
                    // All other Polymer settings get passed to declaration of this property on the element:
                type: String,
                notify: true,
            },
        }),
    ]
})
```

the above declaration will make the properties available in `<example-descendant-component>`s template:
```HTML
<template>
    myProp1 value is {{myProp1}}
    <br/>
    myProp2 value is {{myProp2}}
</template>
```

while their values will come from the closest ancestor that has the corresponding dash-case attribute.
```HTML
<example-container-component my-prop1="some value" my-prop2="some other value"><!-- Container can also be a simple HTML <div>. As long as it has the attributes. These attributes are a requirement to discover the ancestor. If the element also has matching properties, they instead will be taken and their changes listened to. -->
  <example-descendant-component></example-descendant-component>
</example-container-component>
```

