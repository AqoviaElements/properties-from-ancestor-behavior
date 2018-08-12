import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class TestAncestorComponentAsContainer extends PolymerElement {
  static get template() {
    return html`
        <fieldset>
            <legend>Container</legend>
            <input type="text" value="{{myProp1::input}}">
            <fieldset>
                <legend>Content</legend>
                <slot></slot>
            </fieldset>
        </fieldset>
`;
  }

  static get is() { return "test-ancestor-component-as-container"; }
  static get properties() {
      return {
          myProp1: {
              notify: true, // Notify is required for the descendants to receive changes
              reflectToAttribute: true,
          }
      };
  }
}
customElements.define(TestAncestorComponentAsContainer.is, TestAncestorComponentAsContainer);
