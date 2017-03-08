import Ember from 'ember';
import layout from '../templates/components/ui-login';
import styles from '../styles/components/ui-login';
import computed from 'ember-computed'
import get from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import { htmlSafe } from 'ember-string';
import inject from 'ember-service/inject';

export default Ember.Component.extend({
  layout, styles,
  session: inject(),
  tagName: 'div',
  classNames: ['ui-login'],
  attributeBindings:['size:style'],

  width: '410px',
  linkColor: 'text-blue',

  size: computed('width', function() {
    const width = get(this, 'width');
    return width
      ? htmlSafe(`width: ${width};`)
      : null;
  }),

  regular: computed('oauth', 'profile', function() {
    if (get(this,'oauth')){
      return 'oauth';
    }
    if (get(this,'profile')){
      return 'profile';
    }
  }),

  addition: computed('addonLinke', 'addonLabel', function() {
    if (get(this,'addonLinke')){
      return true;
    }
    if (get(this,'addonLabel')){
      return true;
    }
  }),

});
