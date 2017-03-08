import Component from 'ember-component';
import layout from '../templates/components/ui-section-sortable';
import styles from '../styles/components/ui-section-sortable';
import {assign} from 'ember-platform';
import Sortable from 'sortable';
import {scheduleOnce} from 'ember-runloop'
import get from 'ember-metal/get';

export default Component.extend({
  layout, styles,

  localClassNames: ['sortable-wrapper'],

  didInsertElement() {
    scheduleOnce('afterRender', this, 'newSortableGroup');
  },

  createSortableGroup(name, opts) {
    const options = assign({}, {
      handle:  ".handle",
      animation: 200
    }, opts);

    this[`sortable-${name}`] = Sortable.create(
      this.element, options
    );
  },


  newSortableGroup(){
    const sortable = get(this, "sortable");
    const put = get(this, 'put') && get(this, 'put').replace(/\s+/g,'').split(',');
    if(sortable){
      this.createSortableGroup(sortable, {group: {name: sortable, put: put || true}});
    }
  }
}).reopenClass({positionalParams: ['data']});
