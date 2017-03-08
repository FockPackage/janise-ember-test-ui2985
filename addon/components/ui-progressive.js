import Component from 'ember-component';
import layout from '../templates/components/ui-progressive';
import styles from '../styles/components/ui-progressive';
import computed, { notEmpty } from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';
import stackBlurImage from './stack-blur';
import { later } from 'ember-runloop';

const addClassName = (element, className) => {
  element.classList.add(className);
};

export default Component.extend({
  layout, styles,
  tagName: 'div',
  classNames: ['progressive-image'],
  localClassNameBindings: [
    'background',
    'hasObjectFit:object-fit',
    'objectFit',
    'fitRow:fit-row',
    'fitColumn:fit-column'
  ],

  ratio: 1,
  background: true,
  hasObjectFit: notEmpty('objectFit'),
  objectFit: null,

  fitRow: computed('hasObjectFit', 'ratio', {
    get() {
      return get(this, 'hasObjectFit') && (+get(this, 'ratio') < 1);
    }
  }),

  fitColumn: computed('hasObjectFit', 'ratio', {
    get() {
      return get(this, 'hasObjectFit') && (+get(this, 'ratio') > 1);
    }
  }),

  dynamicWidth: computed('ratio', 'objectFit', {
    get() {
      if (get(this, 'fitColumn') && 'contain' === get(this, 'objectFit')) {
        return `${100 / get(this, 'ratio')}%`;
      } else return false;
    }
  }),

  dynamicHeight: computed('ratio', 'objectFit', {
    get() {
      if (get(this, 'fitRow') && 'contain' === get(this, 'objectFit')) {
        return `${get(this, 'ratio') * 100}%`;
      } else return false;
    }
  }),

  paddingElement: computed('ratio', 'objectFit', {
    get() {
      if (get(this, 'objectFit')) {
        return htmlSafe(`<div style="padding-top: 100%;"></div>`);
      } else {
        const paddingTop = get(this, 'ratio') * 100;
        return htmlSafe(`<div style="padding-top: ${paddingTop}%;"></div>`);
      }
    }
  }),

  didInsertElement() {
    const dynamicWidth = get(this, 'dynamicWidth');
    const dynamicHeight = get(this, 'dynamicHeight');

    const thumbnail = new Image();
    const canvas = document.createElement('canvas');

    addClassName(thumbnail, 'thumbnail');
    thumbnail.crossOrigin = 'Anonymous';
    thumbnail.src = get(this, 'thumbnail');

    if (dynamicWidth) {
      thumbnail.style.margin = '0 auto';
      thumbnail.style.width = dynamicWidth;
      canvas.style.margin = '0 auto';
      canvas.style.width = dynamicWidth;
    }

    if (dynamicHeight) {
      thumbnail.style.margin = 'auto 0';
      thumbnail.style.height = dynamicHeight;
      canvas.style.margin = 'auto 0';
      canvas.style.height = dynamicHeight;
    }

    thumbnail.onload = () => {
      addClassName(thumbnail, 'loaded');
      const dimensions = thumbnail.getBoundingClientRect();
      dimensions.width && stackBlurImage(thumbnail, dimensions, canvas, 100);
    }

    this.element.appendChild(thumbnail);
    this.element.appendChild(canvas);

    const image = new Image();

    addClassName(image, 'image');
    image.src = get(this, 'image');

    if (dynamicWidth) {
      image.style.margin = '0 auto';
      image.style.width = dynamicWidth;
    }

    image.onload = () => {
      addClassName(image, 'loaded');
      later(this, 'teardownStackBlueEffect', canvas, thumbnail, 1000);
    };

    this.element.appendChild(image);
  },

  teardownStackBlueEffect(canvas, thumbnail) {
    if (this.element) {
      this.element.removeChild(canvas);
      this.element.removeChild(thumbnail);
    }

  }
}).reopenClass({positionalParams: ['image', 'thumbnail', 'ratio']});
