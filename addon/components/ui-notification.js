import Component from 'ember-component';
import layout from '../templates/components/ui-notification';
import styles from '../styles/components/ui-notification';
import computed from 'ember-computed';
import { htmlSafe } from 'ember-string';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout, styles,
  attributeBindings: ['style'],
  classNames: ['ui-notification'],
  classNameBindings: ['positionClassName'],
  localClassNames: ['container'],

  width: 540,
  style: computed('width', function() {
    return htmlSafe(`width: ${get(this, 'width')}px`);
  }),

  position: 'top',
  positionClassName: computed('position', function() {
    // TODO: provide multi positions
    return get(this, `styles.${get(this, 'position')}`);
  }),



  actions: {
    close(instance) {
      this.notification.remove(instance);
    },

    pause(instance) {
      if (get(instance, 'remaining')) {
        set(instance, 'paused', true);
        this.notification.pause(instance);
      }
    },

    resume(instance) {
      if (get(instance, 'remaining')) {
        set(instance, 'paused', false);
        this.notification.start(instance);
      }
    }
  }
});
