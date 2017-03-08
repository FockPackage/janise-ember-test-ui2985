import { later, scheduleOnce } from 'ember-runloop';
import Presenter from 'ember-dialog/components/presenter';
import get from 'ember-metal/get';
import computed, { reads } from 'ember-computed';
import { htmlSafe } from 'ember-string';
import styles from '../styles/components/ui-modal';

export default Presenter.extend({
  styles,
  classNames: ['ui-modal'],

  backgroundToShow: reads("styles.fadein"),
  backgroundToHide: reads("styles.fadeout"),
  contentToShow: reads("styles.zoomin"),
  contentToHide: reads("styles.zoomout"),
  delay: 200,

  backgroundStyle: computed('backgroundColor', function() {
    const backgroundColor = get(this, 'backgroundColor');
    return backgroundColor ? `background-color: ${backgroundColor};` : '';
  }),

  style: computed('backgroundStyle', function() {
    return htmlSafe(`${get(this, 'backgroundStyle')}`);
  }),

  accept() {
    this.$(".ui-modal-background").addClass(get(this, "backgroundToHide"));
    this.$(".ui-modal-content").addClass(get(this, "contentToHide"));

    later(this, "_accept", this.get("delay"));
  },

  decline() {
    this.$(".ui-modal-background").addClass(get(this, "backgroundToHide"));
    this.$(".ui-modal-content").addClass(get(this, "contentToHide"));

    later(this, "_decline", this.get("delay"));
  },

  didRender() {
    const animationClass = get(this, "styles.animation");
    this.$(".ui-modal-background").addClass(animationClass);
    this.$(".ui-modal-content").addClass(animationClass);
    return this._super(...arguments);
  },

  didInsertElement() {
    scheduleOnce("afterRender", this, () => {
      this.$(".ui-modal-background").addClass(get(this, "backgroundToShow"));
      this.$(".ui-modal-content").addClass(get(this, "contentToShow"));
    });

    return this._super(...arguments);
  }
});
