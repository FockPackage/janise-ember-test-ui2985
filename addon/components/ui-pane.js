import Component from 'ember-component';
import layout from '../templates/components/ui-pane';
import styles from '../styles/components/ui-pane';
import computed,{oneWay} from 'ember-computed';
import {setProperties} from 'ember-metal/set';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';
import {scheduleOnce, later} from 'ember-runloop';
import Swiper from 'swiper';

export default Component.extend({
  layout, styles,
  tagName: "div",
  classNames: ['ui-pane'],
  classNameBindings: ['_paneColor'],
  attributeBindings: [
    'hasPaneColor:data-color',
    'hasHeaderImage:data-image',
    'data-theme',
    'inlineStyle:style'
  ],
  size: 16,
  viewBox: 16,
  controlIconSize: 16,
  controlIconViewBox: 16,
  headerSize: 'medium',
  'data-theme': oneWay('theme.name'),
  isShow: true,
  collapseState: true,

  _paneColor:computed('paneColor', 'paneCustomColor', function () {
    const paneColor = get(this, 'paneColor');
    return styles[paneColor];
  }),

  state: computed('icon', 'image', 'afterIcon', function() {
    if (get(this,'icon')){
      return 'before-icon';
    }
    if (get(this,'image')){
      return 'images';
    }
  }),

  hasHeaderImage: computed('headerImage', function() {
    return !!get(this, 'headerImage')
  }),

  hasPaneColor: computed('paneColor', 'paneCustomColor', function() {
    return !!get(this, 'paneColor') || !!get(this, 'paneCustomColor')
  }),

  inlineStyle: computed('paneCustomColor', function() {
    if (get(this, 'paneCustomColor')) {
      return htmlSafe(`background-color: ${get(this, 'paneCustomColor')};`)
    }
    return null;
  }),

  contentSlide(){
    later(()=>{
      const content = this.element.querySelector('.slide-container');
      this.swiper = new Swiper(content, {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 32,
      });
    },0);

  },

  actions: {
    handleClose(){
      setProperties(this, {'isShow': false, 'state': 'close'});
    },

    handleCollapse(){
      this.toggleProperty('collapseState');
    },

    handleSlidePrev(){
      this.swiper.slidePrev();
    },

    handleSlideNext(){
      this.swiper.slideNext();
    }
  },

  didInsertElement(){
    if(get(this, 'slide')){
      scheduleOnce('afterRender', this, 'contentSlide');
    };
  },

  willDestroyElement(){
    this.swiper && this.swiper.destroy(true, true);
  },

}).reopenClass({positionalParams: ['pane']});
