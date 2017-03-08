import Ember from 'ember';
import layout from '../templates/components/ui-popup';
import styles from '../styles/components/ui-popup';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';

export default Ember.Component.extend({
  layout, styles,
  tagName: 'div',
  classNames: ['ui-popup'],
  classNameBindings:['_arrow'],
  attributeBindings: ['tooltip:data-tooltip', 'data-theme'],

  'data-theme': oneWay('theme.name'),

  '_arrow':computed('arrow', function () {
    const arrow = get(this, 'arrow');
    return arrow ? styles[arrow] : styles['top'];
  }),

}).reopenClass({positionalParams: ['tooltip', 'arrow']});
