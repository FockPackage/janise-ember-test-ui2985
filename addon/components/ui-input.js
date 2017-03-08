import Component from 'ember-component';
import layout from '../templates/components/ui-input';
import styles from '../styles/components/ui-input';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout, styles,
  tagName: 'div',
  classNames: ['ui-input'],
  classNameBindings:['_size','_color'],
  attributeBindings: ['disabledValue:data-state', 'data-theme'],

  type: 'text',
  size: 'medium',
  'data-theme': oneWay('theme.name'),

  _color: computed('color', function () {
    const color = get(this, 'color');
    return color ? styles[color] : styles['blue'] ;
  }),

  _size: computed('size', function () {
    const size = get(this, 'size');
    return size ? styles[size] : styles['medium'];
  }),

  disabledValue: computed('disabled', function() {
    return get(this, 'disabled') && 'disabled';
  }),

  didInsertElement() {
    set(this, 'inputID',this.element.querySelector('input').id);
  },
}).reopenClass({positionalParams: ['label']});
