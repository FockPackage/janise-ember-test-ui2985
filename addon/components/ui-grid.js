import Component from 'ember-component';
import layout from '../templates/components/ui-grid';
import styles from '../styles/components/ui-grid';

export default Component.extend({
  layout, styles,
  tagName: 'div',
  classNames: ['ui-grid'],
  classNameBindings: ['edge'],

  edge: 'default',
}).reopenClass({positionalParams: ['edge']});
