import Component from 'ember-component';
import layout from '../templates/components/ui-item';
import styles from '../styles/components/ui-item';
import inject from 'ember-service/inject'
import computed,{oneWay} from 'ember-computed';
import get from 'ember-metal/get';
import {isPresent, tryInvoke} from 'ember-utils';
import {isBlank} from 'ember-utils';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout, styles,
  tagName: 'a',
  classNames: ['ui-item'],
  classNameBindings:['_activeColor'],
  localClassNameBindings: ['active','default', 'divider', 'badges', 'sub'],
  attributeBindings: ['disabled', 'href', 'state:data-state', 'hint:data-hint', 'attachmentBorder:style', 'data-theme'],
  _routing: inject('-routing'),
  itemList: inject('ui-item-list'),

  disabled: false,
  size: 16,
  viewBox: 16,
  badgesColor: 'lime',
  'data-theme': oneWay('theme.name'),

  '_activeColor':computed('activeColor', function () {
    const activeColor = get(this, 'activeColor');
    return activeColor ? styles[activeColor] : styles['blue'];
  }),

  state: computed('icon', 'image', function() {
    if (get(this,'icon')){
      return 'before-icon';
    }
    if (get(this,'image')){
      return 'images';
    }
  }),

  sub: computed('subLabel', function() {
    return get(this, 'subLabel') && 'sub';
  }),

  default: computed('iconColor', function() {
    return isBlank(get(this, 'iconColor')) && 'default';
  }),

  blank: computed('attachmentsImage', function() {
    return isBlank(get(this, 'attachmentsImage')) && 'blank';
  }),

  custom: computed('attachmentColor', function() {
    return get(this, 'attachmentColor') && 'custom';
  }),

  active: computed('route', "_routing.router.currentRouteName", function() {
    const route = get(this, 'route');
    if (isBlank(route)) return false;

    const currentRouteName = get(this, "_routing.router.currentRouteName");
    if (currentRouteName == route) return true;

    return currentRouteName.indexOf(route) == 0 && currentRouteName[route.length] == '.';
  }),

  routable: computed('route', function() {
    return isPresent(get(this, 'route'))
  }).readOnly(),

  attachmentImage: computed('attachmentsImage', function() {
    const attachmentsImage = get(this, 'attachmentsImage');
    return attachmentsImage ? htmlSafe(`background-image: url('${attachmentsImage}');`) : null;
  }),

  attachmentColor: computed('attachmentsColor', function() {
    const attachmentsColor = get(this, 'attachmentsColor');
    return attachmentsColor ? htmlSafe(`background-color: ${attachmentsColor}; border-color: ${attachmentsColor};`) : null;
  }),

  attachmentBorder: computed('attachmentsColor', function() {
    const attachmentsColor = get(this, 'attachmentsColor');
    return attachmentsColor ? htmlSafe(`box-shadow: inset 0 0 0 1px ${attachmentsColor}; color: ${attachmentsColor};`) : null;
  }),

  init() {
    this._super(...arguments);

    if (get(this, 'inList')) {
      get(this, 'itemList').pushItem(get(this, "listId"), this);
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    if (get(this, 'inList')) {
      get(this, 'itemList').filterItem(get(this, "listId"), get(this, "label"));
    }
  },

  click(event) {
    console.log(get(this, "label"));
    if (get(this, 'routable')) {
      event.preventDefault();
      get(this, '_routing').transitionTo(get(this, 'route'))
    }
    tryInvoke(this, 'onClick', get(this, 'inList') ? [get(this, "label"), ...arguments] : arguments);
  },

}).reopenClass({positionalParams: ['label', 'icon', 'size', 'viewBox']});
