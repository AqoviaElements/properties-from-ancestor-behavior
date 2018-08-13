import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import { TestDescendantComponentsMixinWithProp } from './test-descendant-components-mixin-with-prop.js';
import { TestDescendantComponentsBehaviorWithPropAsLegacyHybrid } from './test-descendant-components-behavior-with-prop-as-legacy-hybrid.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { PropertiesFromAncestorBehavior } from '../properties-from-ancestor-behavior.js';
class TestDescendantComponent extends TestDescendantComponentsMixinWithProp(mixinBehaviors([
    PropertiesFromAncestorBehavior({
        myProp1: {},
        myBoolProp1: {},
        myNumberProp1: {},
        myBoolPropFromMixin1: {},
        myNumberPropFromMixin1: {},
        myBoolPropFromBehaviorAsLegacyHybrid1: {},
        myNumberPropFromBehaviorAsLegacyHybrid1: {},
    }),
    TestDescendantComponentsBehaviorWithPropAsLegacyHybrid,
], PolymerElement)) {
  static get template() {
    return html`
        <h1>Descendant component</h1>
        myProp1 value is {{myProp1}}
`;
  }

  static get is() { return 'test-descendant-component'; }
  static get properties() {
      return {
          myProp1: String,
          myBoolProp1: Boolean,
          myNumberProp1: Number,
      };
  }
}
customElements.define(TestDescendantComponent.is, TestDescendantComponent);
