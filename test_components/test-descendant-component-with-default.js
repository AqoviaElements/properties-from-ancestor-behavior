import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class TestDescendantComponentWithDefault extends mixinBehaviors([
    PropertiesFromAncestorBehavior({
        myProp1: {
            defaultValue: 'defaultValue',
        },
    }),
], PolymerElement){
  static get template() {
    return html`
        <h1>Descendant component</h1>
        myProp1 value is {{myProp1}}
`;
  }

  static get is() { return "test-descendant-component-with-default"; }
  static get properties() {
      return {
          myProp1: {},
      };
  }
}
customElements.define(TestDescendantComponentWithDefault.is, TestDescendantComponentWithDefault);
