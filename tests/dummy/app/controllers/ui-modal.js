import Controller from 'ember-controller';
import get from 'ember-metal/get';

export default Controller.extend({
  actions: {
    click1() {
      get(this, 'modal').show('components/ui-modal-page/default', {
        size: 'medium'
      });
    },

    click2() {
      get(this, 'modal').confirm('components/ui-modal-page/confirm', {
        formName: "早餐调研"
      });
    },

    click3() {
      get(this, 'modal').alert('components/ui-modal-page/alert', {
        customText: "customText",
        otherCustomText: "otherCustomText"
      });
    },

    click4() {
      get(this, 'modal').show('components/ui-modal-page/default', {
        backgroundColor: '#80C8EF'
      });
    },
  }
});
