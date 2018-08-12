import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class TestDescendantComponentDisablableFromFieldsetStartingAsFalse extends mixinBehaviors([
    PropertiesFromAncestorBehavior({
        disabled: {
            type: Boolean,
            ancestorMatches: 'fieldset',
            ancestorObservedItem: PropertiesFromAncestorBehavior.ObservedItem.ATTRIBUTE, /*<fieldset> has a disabled property but changing it doesn't emit disabled-changed*/
        },
    }),
], PolymerElement) {
  static get template() {
    return html`
        <h1>Descendant component</h1>
        disabled={{disabled}}
`;
  }

  static get is() { return "test-descendant-component-disablable-from-fieldset-starting-as-false"; }
  static get properties() {
      return {
          disabled: Boolean,
      };
  }
}
customElements.define(TestDescendantComponentDisablableFromFieldsetStartingAsFalse.is, TestDescendantComponentDisablableFromFieldsetStartingAsFalse);
