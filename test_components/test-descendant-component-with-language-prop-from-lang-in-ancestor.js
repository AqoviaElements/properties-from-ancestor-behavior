import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { PropertiesFromAncestorBehavior } from '../properties-from-ancestor-behavior.js';
class TestDescendantComponentWithLanguagePropFromLangInAncestor extends mixinBehaviors([
    PropertiesFromAncestorBehavior({
        language: {
            ancestorPropertyAlias: 'lang',
            ancestorObservedItem: PropertiesFromAncestorBehavior.ObservedItem.ATTRIBUTE, /*elements have a lang property but changing it doesn't emit disabled-changed*/
        },
    }),
], PolymerElement){
  static get template() {
    return html`
        <h1>Descendant component</h1>
        disabled={{disabled}}
`;
  }

  static get is() { return "test-descendant-component-with-language-prop-from-lang-in-ancestor"; }
  static get properties() {
      return {
          language: String,
      };
  }
}
customElements.define(TestDescendantComponentWithLanguagePropFromLangInAncestor.is, TestDescendantComponentWithLanguagePropFromLangInAncestor);
