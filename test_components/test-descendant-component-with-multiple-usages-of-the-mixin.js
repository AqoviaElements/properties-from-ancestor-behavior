import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class TestDescendantComponentWithMultipleUsagesOfTheMixin extends mixinBehaviors([
    PropertiesFromAncestorBehavior({
        myProp1: {
        },
    }),
    PropertiesFromAncestorBehavior({
        myProp2: {
        },
    }),
], PolymerElement){
  static get template() {
    return html`
        <h1>Descendant component</h1>
        myProp1 value is {{myProp1}}
        myProp2 value is {{myProp2}}
`;
  }

  static get is() { return "test-descendant-component-with-multiple-usages-of-the-mixin"; }
  static get properties() {
      return {
          myProp1: {},
          myProp2: {},
      };
  }
}
customElements.define(TestDescendantComponentWithMultipleUsagesOfTheMixin.is, TestDescendantComponentWithMultipleUsagesOfTheMixin);
