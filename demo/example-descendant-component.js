import '@polymer/polymer/polymer-legacy.js';
import { PropertiesFromAncestorBehavior } from '../properties-from-ancestor-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class ExampleDescendantComponent extends mixinBehaviors([
    PropertiesFromAncestorBehavior({
        myProp1: {},
        myProp2: {},
    }),
], PolymerElement) {
  static get template() {
    return html`
        <fieldset>
            <legend>Descendant component</legend>
            myProp1 value is {{myProp1}}
            <br>
            myProp2 value is {{myProp2}}
        </fieldset>
`;
  }

  static get is() { return "example-descendant-component"; }
  static get properties() {
      return {
          myProp1: {},
          myProp2: {},
      };
  }
}
customElements.define(ExampleDescendantComponent.is, ExampleDescendantComponent);
