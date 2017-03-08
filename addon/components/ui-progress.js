import Component from 'ember-component';
import layout from '../templates/components/ui-progress';
import styles from '../styles/components/ui-progress';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout, styles,
  tagName: 'div',
  classNames: ['ui-progress'],
  classNameBindings: ['_color', '_size', '_position'],
  attributeBindings: ['disabled', 'activity', 'hasLabel:data-state', 'progress:data-percent', 'data-theme'],

  'data-theme': oneWay('theme.name'),

  '_color':computed('color', function () {
    const color = get(this, 'color');
    return color ? styles[color] : styles['blue'];
  }),

  '_size': computed('size', function () {
    const size = get(this, 'size');
    return size ? styles[size] : styles['medium'];
  }),

  '_position': computed('position', function () {
    const position = get(this, 'position');
    return position ? styles[position] : null;
  }),

  hasLabel: computed('label', function() {
    return (get(this, 'label') || get(this, 'label') == 0)  && 'label';
  }),

  bar: computed('progress', function() {
    const progress = get(this, 'progress');
    return progress ? htmlSafe(`width: ${progress}%;`) : null;
  }),

  customColor: computed('custom', function() {
    const custom = get(this, 'custom');
    return custom ? htmlSafe(`background-color: ${custom};`) : null;
  }),

}).reopenClass({positionalParams: ['label']});
