import Component from 'ember-component';
import layout from '../templates/components/ui-checkbox';
import styles from '../styles/components/ui-checkbox';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';
import {isBlank} from 'ember-utils';

export default Component.extend({
  layout, styles,
  classNames: ['ui-checkbox'],
  localClassNameBindings: ['switch'],
  classNameBindings:['_color', '_size'],
  attributeBindings: ['blank:data-state', 'data-theme'],

  type: 'checkbox',
  'data-theme': oneWay('theme.name'),

  _color: computed('color', function () {
    const color = get(this, 'color');
    return color ? styles[color] : styles['blue'] ;
  }),

  _size: computed('size', function () {
    const size = get(this, 'size');
    return size ? styles[size] : styles['medium'];
  }),

  blank: computed('label', function() {
    return isBlank(get(this, 'label')) && 'blank';
  }),

  didInsertElement() {
    const label = this.element.querySelector('label');
    const input = this.element.querySelector('input[type=checkbox]');
    label.setAttribute('for', input.id);
  },

}).reopenClass({positionalParams: ['label']});
