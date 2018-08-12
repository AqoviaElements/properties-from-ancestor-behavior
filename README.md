![Published bower package version](https://badge.fury.io/bo/properties-from-ancestor-behavior.svg)
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
            <example-descendant-component></example-descendant-component>
        </div>
        <div>
            <example-descendant-component></example-descendant-component>
        </div>
    </example-ancestor-component>
```
-->


## PropertiesFromAncestorBehavior

A <a href="https://www.polymer-project.org" target="_blank">Polymer</a> Behavior for a web component to take a property value from the closest ancestor that has it. Supports change events.

Such a tool can be useful for ubiquitous properties (think [language of the UI](#html-lang), currency, [`disabled` state to every input of a form](#how-to-native-like-support-for-fieldset-disabled), etc.) which would otherwise pollute attributes of every component with same boilerplate expression, or force usage of a global variable (usually without binding to changes).

### Usage:

Technically, it's a behavior factory function. To have a behavior instance created, you call the `PropertiesFromAncestorBehavior()`.
```JavaScript
Polymer({
    is: 'example-descendant-component',
    behaviors: [
        PropertiesFromAncestorBehavior({
            // Just declaring a property here is enough to make it work.
            myProp1: {
                // Optionally, you can provide a default. If no ancestor is found, `defaultValue` will be used:
                defaultValue: 123, // (don't use the polymer's 'value:' for this though, because it may cause double initialization - once with such value, once with the value from ancestor (if they're different). That's because we can only reach the ancestor on 'attached', which happens after defaults get applied.

                // See "API Reference - Per-Property settings" for all available options

                // If you don't care about polylint, you can avoid repetition and just put here all other property settings. They get passed to declaration of this property on the element:
                notify: true,
                observer: '_myProp1Changed',
            },
        }),
    ],
    properties: {
            // But if you want to keep polylint happy, you need to list the property here too:
            myProp1: {
                // Custom settings still work:
                notify: true,
                observer: '_myProp1Changed',
                // But you don't want to use 'value:' here but rather 'defaultValue:' above. See comment there for 'why'.
            },
    }
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

# API Reference - Per-Property settings #
These parameters can be specified for each property:
- **defaultValue** (_Optional_)  
  If no ancestor is found, `defaultValue` will be used.  
- **ancestorMatches** (_Optional_)
  of type <a href="ttps://www.w3.org/TR/selectors4/" target="_blank">HTML Selector</a>  
  - Instead of looking for ancestor with the dash-case attribute, you can provide a selector. This especially is needed for boolean attributes that start with 'false', because it's represented as no attribute at all.
  Example:
    `ancestorMatches: '.ancestor-markup-class'` - will listen to the closest ancestor with `class="ancestor-markup-class"`
- **ancestorObservedItem** (_Optional_)  
  of enum type  
    `PropertiesFromAncestorBehavior.ObservedItem.PROPERTY_CHANGED_EVENT` (default)  
    `PropertiesFromAncestorBehavior.ObservedItem.ATTRIBUTE`  
  If the ancestor doesn't emit `*-changed` events, you can use `ATTRIBUTE` to tell the behavior that it should use a <a href="https://developer.mozilla.org/en/docs/Web/API/MutationObserver" target="_blank">MutationObserver</a> to listen to the attribute.  
  Take note that in this case the handlers will not fire in the same thread as the change, so if you need to schedule some work after the handlers, you will need to use `setTimeout(..., 0)`.
- **ancestorPropertyAlias** (_Optional_)  
  If the name of the property is different on the ancestor, specify it here (specify 'camelCase' name, but this will also change the expected dash-case attribute and '*-changed' event names).  

# <a id="html-lang"></a>HOW-TO: Automatically reflect container's `lang` attribute in your multi-language component
The <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang" target="_blank">HTML lang attribute</a> is a standard way to declare the content language. It's useful for applying `[lang=...]` CSS rules and <a href="https://www.w3.org/International/questions/qa-lang-why" target="_blank">is recommended for future applications</a>.
It's then a perfect candidate to specify the language in one place and have your components automatically display the right contents:
```HTML
<html lang="en">
  ...
  <p>
    <some-web-component>
      <span>
        <another-web-component></another-web-component>
      <span>
    </some-web-component>
  </p>
  ...
</html>
```
to achieve this effect with the Polymer's <a href="https://github.com/PolymerElements/app-localize-behavior" target="_blank">`AppLocalizeBehavior`</a>, all you need to do is add our behavior next to it, with the following declaration:

```JavaScript
...
behaviors: [
    Polymer.AppLocalizeBehavior,
    PropertiesFromAncestorBehavior({
            language: {
                // This is needed because `AppLocalizeBehavior` requires `language` for the name - see also https://github.com/PolymerElements/app-localize-behavior/issues/98
                ancestorPropertyAlias: 'lang',
                // Observing the attribute will allow changing the language and seeing immediate effect:
                ancestorObservedItem: PropertiesFromAncestorBehavior.ObservedItem.ATTRIBUTE,
            },
        }),
],
...
```

# HOW-TO: Native-like support for `<fieldset disabled>`
The native HTML form input elements like `<input>`, `<button>`, `<select>` elements don't require you to pass the `disabled` attribute to each usage. You use the ancestor <a href="https://html.spec.whatwg.org/multipage/form-elements.html#attr-fieldset-disabled" target="_blank">`fieldset` disabled</a> feature to disable all of the containing inputs.

Here's how this behavior can be used to support the same feature when your web component isn't built from these native inputs:
```
<template>
    <span on-tap="{{handleTap}}">Something only clickable when enabled</span>
</template>
...
Polymer({
    behaviors: [
        PropertiesFromAncestorBehavior({
            disabled: {
                // Use 'ancestorMatches' to provide a way to match while it's enabled (has no disabled attribute)
                ancestorMatches: 'fieldset',

                // <fieldset> has a disabled property, but changing it doesn't emit 'disabled-changed' event, so we must observe the attribute:
                ancestorObservedItem: PropertiesFromAncestorBehavior.ObservedItem.ATTRIBUTE,

                // Specify type, to properly get empty 'disabled' attribute deserialized into 'true':
                type: Boolean,
            },
        }),
    ],
    handleTap: () => {
        if (this.disabled) return;
    
        // If we got here, we're enabled. Handle legitimate click:
        this.DoSomething();
    },
    ...
})
```
