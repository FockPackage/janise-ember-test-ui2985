import Component from 'ember-component';
import layout from '../templates/components/ui-sidebar';
import styles from '../styles/components/ui-sidebar';
import computed,{oneWay} from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';
import inject from 'ember-service/inject'

export default Component.extend({
  layout, styles,
  classNames: ['ui-sidebar'],
  localClassNameBindings: ['position'],
  attributeBindings: ['position:data-state', 'sidebarWidth:style', 'dataSlide:data-slide', 'data-theme'],

  'data-theme': oneWay('theme.name'),

  sidebarWidth: computed('width', function() {
    const width = get(this, 'width');
    return width ? htmlSafe(`width: ${width};`) : null;
  }),

  navSlideStatus: inject('ui-navigation'),

  toggleShow: false,

  dataSlide:computed('navSlideStatus.data-slide', function () {
    const navDataSlide = get(this, `navSlideStatus.data-slide-${get(this,'slideId')}`);
    const position = get(this, 'position');
    if(get(this, 'toggleShow')) {
      return navDataSlide == position ? position : '';
    }
  }),

  didInsertElement(){
    const slideEnable = get(this, 'slide-enable');
    const position = get(this, 'position');
    slideEnable && get(this, 'navSlideStatus').enable(get(this, 'slideId'),position)
  }
});
