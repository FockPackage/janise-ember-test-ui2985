import Component from 'ember-component';
import layout from '../templates/components/ui-tabs';
import styles from '../styles/components/ui-tabs';
import computed,{oneWay} from 'ember-computed';
import inject from 'ember-service/inject'
import get from 'ember-metal/get';
import {isBlank} from 'ember-utils';

export default Component.extend({
  layout, styles,
  tagName: 'div',
  classNames: ['ui-tabs'],
  classNameBindings:['active'],
  attributeBindings: ['iconState:data-icon', 'data-theme'],
  'data-theme': oneWay('theme.name'),
  _routing: inject('-routing'),


  active: computed('route', "_routing.router.currentRouteName", function() {
    const route = get(this, 'route');
    if (isBlank(route)) return false;

    const currentRouteName = get(this, "_routing.router.currentRouteName");
    if (currentRouteName == route) return true;

    return currentRouteName.indexOf(route) == 0 && currentRouteName[route.length] == '.';
  }),


  iconState: computed('icon', 'image', function() {
    if (get(this,'icon')){
      return 'before-icon';
    }
    if (get(this,'image')){
      return 'before-icon';
    }
  }),

  myTabs: computed('tabs', "_routing.router.currentRouteName", function () {

    const currentRouteName = get(this, "_routing.router.currentRouteName");
    let active_array = get(this, 'tabs');
    active_array.forEach((item)=>{
      if (currentRouteName.indexOf(item.route) >= 0){
        item.activeName = get(this, 'styles')['active'];
      }else {
        item.activeName = ''
      }
    });
    return active_array;
  }),

}).reopenClass({positionalParams: ['tabs']});
