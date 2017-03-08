import Component from 'ember-component';
import layout from '../templates/components/ui-dropdown';
import styles from '../styles/components/ui-dropdown';
import { oneWay } from 'ember-computed';
import { setProperties } from 'ember-metal/set';
import { tryInvoke } from 'ember-utils';
import inject from 'ember-service/inject'
import get from 'ember-metal/get';

export default Component.extend({
  layout, styles,
  classNames: ['ui-dropdown'],
  itemList: inject('ui-item-list'),

  'data-theme': oneWay('theme.name'),

  horizontalPosition: 'left',
  verticalPosition: 'auto',

  init() {
    this._super(...arguments);

    if (!get(this, "isSubDropdown")) {
      get(this, 'itemList').initList(get(this, 'elementId'));
    }
  },

  actions: {
    selectItem(label) {
      if (get(this, "isSubDropdown")) {
        tryInvoke(this, 'onClick', [label, ...arguments]);
      } else {
        const item = get(this, 'itemList').selectItem(get(this, 'elementId'), label);
        setProperties(this, {
          text: get(item, "label"),
          icon: get(item, "icon"),
          iconColor: get(item, "iconColor"),
          image: get(item, "image")
        });
        tryInvoke(this, 'onClick', [item, ...arguments]);
      }
    }
  }
});
