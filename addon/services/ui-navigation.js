import Service from 'ember-service';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Service.extend({
  'data-slide':true,
  enable(slideId,slide) {
    set(this, `data-slide-${slideId}`, slide);
    this.toggleProperty('data-slide');
  },

  disable(slideId) {
    set(this, `data-slide-${slideId}`, '');
  },

  toggle(slideId,slide) {
    set(this, `data-slide-${slideId}`, get(this, `data-slide-${slideId}`) == slide ? '' : slide);
    this.toggleProperty('data-slide');
  }
});
