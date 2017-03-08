import Component from 'ember-component';
import layout from '../templates/components/ui-radio';
import styles from '../styles/components/ui-radio';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';
import {isBlank} from 'ember-utils';

export default Component.extend({
  layout, styles,
  classNames: ['ui-radio'],
  localClassNameBindings: ['switch'],
  classNameBindings: ['_color', '_size'],
  attributeBindings: ['inlineStyle:style', 'blank:data-state', 'data-theme'],

  type: 'radio',
  'data-theme': oneWay('theme.name'),

  '_color':computed('color', function () {
    const color = get(this, 'color');
    return color ? styles[color] : styles['blue'];
  }),

  '_size': computed('size', function () {
    const size = get(this, 'size');
    return size ? styles[size] : styles['medium'];
  }),


  blank: computed('label', function() {
    return isBlank(get(this, 'label')) && 'blank';
  }),

  checked: computed('currentValue', function() {
    return get(this, 'value') == get(this, 'currentValue');
  }).readOnly(),

  didInsertElement() {
    const label = this.element.querySelector('label');
    const input = this.element.querySelector('input[type=radio]');
    label.setAttribute('for', input.id);
  },

}).reopenClass({positionalParams: ['label']});
