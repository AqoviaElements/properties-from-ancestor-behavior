import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class ExampleAncestorComponent extends PolymerElement {
  static get template() {
    return html`
        <fieldset>
            <legend>Container</legend>
            <label>
                myProp1:
                <select value="{{myProp1::input}}">
                    <option>Initial Value</option>
                    <option>Some Other Value</option>
                </select>
            </label>
            <br>
            <label>
                myProp2:
                <select value="{{myProp2::input}}">
                    <option>Initial Value</option>
                    <option>Some Other Value of Prop2</option>
                </select>
            </label>
            <fieldset>
                <legend>Content</legend>
                <slot></slot>
            </fieldset>
        </fieldset>
`;
  }

  static get is() { return "example-ancestor-component"; }
  static get properties() {
      return {
          myProp1: {
              notify: true, // Notify is required for the descendants to receive changes
              reflectToAttribute: true,
          },
          myProp2: {
              notify: true, // Notify is required for the descendants to receive changes
              reflectToAttribute: true,
          },
      };
  }
}
customElements.define(ExampleAncestorComponent.is, ExampleAncestorComponent);
