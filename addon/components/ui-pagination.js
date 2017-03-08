import Ember from 'ember';
import layout from '../templates/components/ui-pagination';
import styles from '../styles/components/ui-pagination';
import set, {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';
import computed from 'ember-computed';


export default Ember.Component.extend({
  layout,styles,
  limit: 3,
  localClassNames:['ui-pagination'],
  currentPage: 0,
  counts: computed('count', function () {
    const count = get(this, 'count');

    let new_array = [];
    for (let i = 0; i < count; i++) {
      new_array.push(i);
    }
    return new_array;
  }),

  items: computed('counts', 'currentPage', function () {
    const counts = get(this, 'counts');
    const limit = get(this, 'limit');
    const currentPage = get(this, 'currentPage');
    if (counts.length <= limit) return counts;
    if((counts.length - currentPage) <= limit) return counts.slice(counts.length - limit , counts.length);
    return counts.slice(currentPage, currentPage + limit);

  }),

  leftBt: computed('count', function () {
    const count = get(this, 'count');
    return count > get(this, 'limit');
  }),
  rightBt: computed('count', function () {
    const count = get(this, 'count');

    return count > get(this, 'limit');
  }),

  leftDisabled: computed('currentPage', function () {
    const currentPage = get(this, 'currentPage');
    return currentPage <= 0;
  }),

  rightDisabled: computed('currentPage', 'count', function () {
    return get(this, 'currentPage') + 1 >= get(this, 'count');
  }),

  isPositiveInteger(s){
    var re = /^[1-9]*[1-9][0-9]*$/;
    return re.test(s)
  },

  actions: {
    inputKeyUp(value){
      if(this.isPositiveInteger(value)){
        const _value = parseInt(value);
        set(this, 'value', _value);
        set(this, 'error', false);
      }else{
        set(this, 'error', `请输入1-${get(this, 'count')}的正整数！`);
      }
    },

    handleSelectIndex(value){
      get(this, 'handleSelectIndex')(parseInt(value) - 1);
    }
  }

});
