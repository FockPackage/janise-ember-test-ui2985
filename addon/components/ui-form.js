import Component from 'ember-component';
import layout from '../templates/components/ui-form';

export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['ui-form'],
  classNameBindings: ['arrange', 'column'],

  arrange: 'horizontal',
  column: 'two'
}).reopenClass({positionalParams: ['arrange', 'column']});
