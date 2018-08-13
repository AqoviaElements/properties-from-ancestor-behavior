import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import { TestDescendantComponentsBehaviorWithPropAsLegacyHybrid  } from './test-descendant-components-behavior-with-prop-as-legacy-hybrid.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PropertiesFromAncestorBehavior } from '../properties-from-ancestor-behavior.js';
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
