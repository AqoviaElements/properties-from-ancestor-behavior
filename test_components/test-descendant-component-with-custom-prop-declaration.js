import '@polymer/polymer/polymer-legacy.js';
import '../properties-from-ancestor-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class TestDescendantComponentWithCustomPropDeclaration extends mixinBehaviors([
    PropertiesFromAncestorBehavior({
        myProp1: {
            defaultValue: 'defaultValue',
            observer: '_myProp1ChangedInBehavior',
        },
    }),
], PolymerElement){
  static get template() {
    return html`
        <h1>Descendant component</h1>
        myProp1 value is {{myProp1}}
`;
  }

  static get is() { return "test-descendant-component-with-custom-prop-declaration"; }
  static get properties() {
      return {
          myProp1: {
              observer: '_myProp1Changed',
              notify: true,
              reflectToAttribute: true,
          },
          _myProp1ChangedObserverInBehaviorFired: Boolean,
          _myProp1ChangedObserverFired: Boolean,
          _myProp1ChangedEventFired: Boolean,
      };
  }
  created() {
      this.addEventListener('my-prop1-changed', function () {
              this._myProp1ChangedEventFired = true;
          }.bind(this))
  }
  _myProp1Changed() {
      this._myProp1ChangedObserverFired = true;
  }
  _myProp1ChangedInBehavior() {
      this._myProp1ChangedObserverInBehaviorFired = true;
  }
}
customElements.define(TestDescendantComponentWithCustomPropDeclaration.is, TestDescendantComponentWithCustomPropDeclaration);
