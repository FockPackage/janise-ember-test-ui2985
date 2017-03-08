import Controller from 'ember-controller';
import { later } from 'ember-runloop';

export default Controller.extend({
  init() {
    this.notification.info('<strong>This is an example message!!!</strong>', {
      autoClear: 0
    });

    later(this, function() {
      this.notification.success('<strong>这是一条提醒消息的范例！！！</strong>');
    }, 5000);

    this.notification.warning('<strong>This is an example message!!!</strong>');
    this.notification.error('<strong>这是一条提醒消息的范例！！！</strong>', {
      autoClear: 10000
    });

    this._super(...arguments);
  },

  actions: {
    toggle() {
      return window.confirm('Are you sure?');
    }
  }
});
