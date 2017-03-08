import Component from 'ember-component';
import layout from '../templates/components/ui-icon';
import styles from '../styles/components/ui-icon';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout, styles,
  tagName: '',

  _size: computed('size', function () {
    const size = get(this, 'size');
    return size ? size : 16;
  }),

  _viewBox: computed('viewBox', function () {
    const viewBox = get(this, 'viewBox');
    return viewBox ? viewBox : 16;
  }),

  icon: null,
  iconColor: null,
  xlink: computed('icon', function() {
    const icon = get(this, 'icon');
    const iconColor = get(this, 'iconColor');
    return icon ? htmlSafe(`<use fill="${iconColor}" xlink:href="#${icon}"></use>`) : null;
  }),

  radius: 0,
  alt: null,
  imageStyle: computed('image', function() {
    const image = get(this, 'image');
    const radius = get(this, 'radius');
    const size = get(this, '_size');
    return image ? htmlSafe(`border-radius: ${radius}px; background-image: url('${image}'); width: ${size}px; height: ${size}px;`) : null;
  }),
}).reopenClass({positionalParams: ['icon', 'size', 'viewBox']});
