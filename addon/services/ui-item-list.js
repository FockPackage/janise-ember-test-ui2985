import Service from 'ember-service';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import { A } from 'ember-array/utils';

export default Service.extend({
  data: {},

  initList(listId) {
    set(this, `data.${listId}`, A());
  },

  pushItem(listId, item) {
    get(this, `data.${listId}`).pushObject(item);
  },

  filterItem(listId, label) {
    const items = get(this, `data.${listId}`).filter(item => item != label);
    set(this, `data.${listId}`, A(items));
  },

  selectItem(listId, label) {
    return get(this, `data.${listId}`).findBy('label', label);
  }
});
