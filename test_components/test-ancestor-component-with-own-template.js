import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './test-descendant-component.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class TestAncestorComponentWithOwnTemplate extends PolymerElement {
  static get template() {
    return html`
        <fieldset>
            <legend>Container</legend>
            <input type="text" value="{{myProp1::input}}">
            <fieldset>
                <legend>Content</legend>
                <div my-prop1="initialValue">
                    <div>
                        <p>Some content.</p>
                        <test-descendant-component></test-descendant-component>
                    </div>
                </div>
            </fieldset>
        </fieldset>
`;
  }

  static get is() { return "test-ancestor-component-with-own-template"; }
  static get properties() {
      return {
          myProp1: {
              notify: true, // Notify is required for the descendants to receive changes
              reflectToAttribute: true,
          }
      };
  }
}
customElements.define(TestAncestorComponentWithOwnTemplate.is, TestAncestorComponentWithOwnTemplate);
