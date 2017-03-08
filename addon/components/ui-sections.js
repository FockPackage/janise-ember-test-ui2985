import Component from 'ember-component';
import layout from '../templates/components/ui-sections';
import styles from '../styles/components/ui-sections';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';

export default Component.extend({
  layout, styles,
  classNames: ['ui-section'],
  localClassNameBindings: ['switch'],
  attributeBindings: ['data-theme'],
  collapseState: 'open',

  'data-theme': oneWay('theme.name'),

  afterIcon: computed('headerIcon', 'collapse', 'icon', 'control', function() {
    if (get(this,'headerIcon')){
      return 'after-icon';
    }
    if (get(this,'collapse')){
      return 'after-icon';
    }
    if (get(this,'icon')){
      return 'after-icon';
    }
    if (get(this,'control')){
      return 'after-icon';
    }
  }),

  actions: {
    handleCollapse(){
      this.toggleProperty('collapseState');
    },
  }

}).reopenClass({positionalParams: ['label']});
