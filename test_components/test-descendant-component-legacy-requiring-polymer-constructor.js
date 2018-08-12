import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import './test-descendant-components-behavior-with-prop-as-legacy-hybrid.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <h1>Descendant component</h1>
        myProp1 value is {{myProp1}}
`,

  is: "test-descendant-component-legacy-requiring-polymer-constructor",

  behaviors: [
      PropertiesFromAncestorBehavior({
          myProp1: String,
          myBoolProp1: Boolean,
          myNumberProp1: Number,
          myBoolPropFromBehaviorAsLegacyHybrid1: {},
          myNumberPropFromBehaviorAsLegacyHybrid1: {},
      }),
      TestDescendantComponentsBehaviorWithPropAsLegacyHybrid,
  ],

  properties: {
      myProp1: String,
      myBoolProp1: Boolean,
      myNumberProp1: Number,
      myBoolPropFromBehaviorAsLegacyHybrid1: {},
      myNumberPropFromBehaviorAsLegacyHybrid1: {},
  }
});
