import ArrayProxy from 'ember-controller/proxy';
import { A } from 'ember-array/utils';
import O from 'ember-object';
import { htmlSafe } from 'ember-string';
import { isNone } from 'ember-utils';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import { assign } from 'ember-platform';
import { later, cancel } from 'ember-runloop';
import RSVP from 'rsvp';

const DELAY_FOR_ANIMATION = 500;

// fix deprecation warning for v2.x
const ArrayProxyService = ArrayProxy.reopenClass({
  isServiceFactory: true
});

export default ArrayProxyService.extend({
  // proxy to a list of notifavation instances
  content: A(),

  // default duration to auto clear a notification
  defaultAutoClear: 3000,

  setDefaultAutoClear(autoClear) {
    set(this, 'defaultAutoClear', autoClear);
  },

  // create a notification
  create(options) {
    if (!options.message) {
      throw new Error('Notification needs message');
    }

    if (options.html) {
      options.message = htmlSafe(options.message);
    }

    // info, success, warning, error
    options.type = options.type || 'info';

    // a number gt zero ? actual value : default value
    options.autoClear = isNone(options.autoClear) ? get(this, 'defaultAutoClear') : options.autoClear;

    const NotificationFactory = O.extend({
      countdownStyle: computed('autoClear', 'paused', function() {
        const duration = get(this, 'autoClear');
        const animationState = get(this, 'paused') ? 'paused' : 'running';
        return htmlSafe(`animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms; animation-play-state: ${animationState}; -webkit-animation-play-state: ${animationState}`);
      })
    });
    const notification = NotificationFactory.create(options);

    if (notification.autoClear) {
      set(notification, 'remaining', notification.autoClear);
      this.start(notification);
    }

    return this.pushObject(notification);
  },

  start(notification) {
    set(notification, 'timestamp', Date.now());

    const timer = later(this, () => {
      set(notification, 'remaining', false);
      this.includes(notification) && this.remove(notification); // if notification still exists
    }, get(notification, 'remaining'));

    set(notification, 'timer', timer);
  },

  pause(notification) {
    cancel(get(notification, 'timer'));

    const elapsed = Date.now() - get(notification, 'timestamp');
    const remaining = get(notification, 'remaining') - elapsed;

    set(notification, 'remaining', remaining);
  },

  remove(notification) {
    if (isNone(notification)) {
      return false;
    }

    set(notification, 'dismiss', true);

    return new RSVP.Promise(resolve => {
      later(this, () => {
        resolve(this.removeObject(notification))
      }, DELAY_FOR_ANIMATION);
    });
  },

  removeAll() {
    set(this, 'content', A());
  },

  // convinent helpers
  info(message, options = {}) {
    return this.create(assign({message, type: 'info'}, options));
  },
  success(message, options = {}) {
    return this.create(assign({message, type: 'success'}, options));
  },
  warning(message, options = {}) {
    return this.create(assign({message, type: 'warning'}, options));
  },
  error(message, options = {}) {
    return this.create(assign({message, type: 'error'}, options));
  }
});
