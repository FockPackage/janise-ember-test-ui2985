import Ember from 'ember';
import layout from '../templates/components/ui-table';
import styles from '../styles/components/ui-table';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import {scheduleOnce} from 'ember-runloop';
import Sortable from 'sortable';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import $ from 'jquery';

export default Ember.Component.extend({
  layout, styles,
  tagName: 'div',
  classNames: ['ui-table'],
  attributeBindings: ['data-state', 'data-theme'],
  'data-state': computed('select', function () {
    return get(this, 'select') ? 'select' : ''
  }),

  'data-theme': oneWay('theme.name'),

  //是否向上排序
  isAscending: false,
  //当前需要排序列的索引值， 默认为-1，不需要排序
  sortColIndex: -1,
  rowSelectIndex: -1,

  supportSortable(){
    const el = this.element.querySelector('tbody');
    this.sortable = new Sortable(el,{
      onEnd:()=>{
        set(this, 'sortColIndex', '-1');
      }
    });
  },

  actions: {
    handleClickSort(key, index){
      this.toggleProperty('isAscending');
      set(this, 'sortColIndex', index);
      set(this, 'sortState', get(this, 'isAscending') ? 'asc' : 'desc');
      get(this, 'handleSort') && get(this, 'handleSort')(key, get(this,'sortState'));
    },

    sort(index){
      this.toggleProperty('isAscending');
      set(this, 'sortColIndex', index);
      const isAscending = get(this, 'isAscending');
      set(this, 'sortState', isAscending ? 'ascending' : 'descending');

      const $tbody = $(this.element.querySelector('tbody'));
      const items = $tbody.find("tr");
      let arr = items.get();
      arr.sort(function(a, b) {
        const itemA = $(a).children("").get(index).innerText;
        const itemB = $(b).children("").get(index).innerText;
        return isAscending
          ? Ember.compare(itemA, itemB)
          : Ember.compare(itemB, itemA);
      });
      $tbody.append(arr);
    },

    select(index, body){
      if (!get(this, 'select')) return;
      set(this,'currentRow', body[body.length - 1].currentRow);
      set(this, 'rowSelectIndex', index == this.rowSelectIndex ? '-1' : index);
    }
  },

  tbodys:oneWay('table.tbodys'),

  didInsertElement(){
    get(this, 'drag') && scheduleOnce('afterRender', this, 'supportSortable');
  }

}).reopenClass({positionalParams: ['table']});
