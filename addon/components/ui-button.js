import Component from 'ember-component';
import layout from '../templates/components/ui-button';
import styles from '../styles/components/ui-button';
import inject from 'ember-service/inject'
import computed,{oneWay} from 'ember-computed';
import get from 'ember-metal/get';
import {isPresent, tryInvoke} from 'ember-utils';
import {htmlSafe} from 'ember-string';
import {isNone} from 'ember-utils';

export default Component.extend({
  layout, styles,
  tagName: 'a',
  classNames: ['ui-button'],
  classNameBindings:['_size', '_color', '_active'],
  attributeBindings: ['disabled', 'extend', 'href', 'type', 'state:data-state', 'style', 'iconState:data-icon', 'data-theme'],

  data: null,
  disabled: false,
  iconSize: '16',
  viewBox: '16',
  'data-theme': oneWay('theme.name'),
  _routing: inject('-routing'),

  '_active':computed('active', function () {
    const active = get(this, 'active');
    return active ? styles[active] : ''
  }),

  '_color':computed('color', function () {
    const color = get(this, 'color');
    return color ? styles[color] : styles[''];
  }),

  '_size': computed('size', function () {
    const size = get(this, 'size');
    return size ? styles[size] : styles['medium'];
  }),

  iconState: computed('icon', 'image', function() {
    if (get(this,'icon')){
      return 'before-icon';
    }
    if (get(this,'image')){
      return 'before-icon';
    }
  }),

  href: computed('route', function() {
    const routeName = get(this, 'route');

    if (routeName) {
      return get(this, '_routing').generateURL(routeName)
    }

    return null;
  }).readOnly(),

  routable: computed('route', function() {
    return isPresent(get(this, 'route'))
  }).readOnly(),

  textColor: computed('customColor', function() {
    const value = get(this, 'customColor');
    return value ? `color: ${value};` : '';
  }),

  backgroundColor: computed('customBackground', function() {
    const value = get(this, 'customBackground');
    return value ? `background-color: ${value};` : '';
  }),

  style: computed('textColor', 'backgroundColor', function() {
    return htmlSafe(`${get(this, 'textColor')}${get(this, 'backgroundColor')}`);
  }),

  state: computed('customColor', 'customBackground', 'color', function() {
    if (get(this,'customBackground')){
      return 'customBackground';
    }
    if (get(this,'customColor')){
      return 'customColor';
    }
    const color = get(this, 'color');
    if (isNone(color)) return 'none'
  }),

  isExtend: computed('extend', 'size', function () {
    const extend = get(this, 'extend');
    if (get(this, 'size') == 'floating' || !extend) {
      return false;
    }
    return extend;
  }),

  click(event) {
    if(get(this, 'disabled')) return;
    if (get(this, 'loading')) return;
    if (get(this, 'routable')) {
      event.preventDefault();
      get(this, '_routing').transitionTo(get(this, 'route'))
    }
    tryInvoke(this, 'onClick', arguments);
  },
}).reopenClass({positionalParams: ['text']});
