import Component from "ember-component";
import layout from "../templates/components/ui-navigation";
import styles from "../styles/components/ui-navigation";
import computed, {oneWay} from "ember-computed";
import get from 'ember-metal/get';
import inject from 'ember-service/inject'
import {htmlSafe} from 'ember-string';
import {isNone} from 'ember-utils';

export default Component.extend ({
  layout, styles,
  tagName: 'nav',
  classNames: ['ui-navigation'],
  classNameBindings: ['_color'],
  attributeBindings: ['slideState:data-state', 'data-slide-left', 'data-slide-right', 'data-theme'],

  'data-theme': oneWay('theme.name'),

  '_color': computed ('color', function () {
    const color = get (this, 'color');
    return color ? styles[color] : styles[''];
  }),

  'data-slide-left': oneWay('renderSidebar'),
  'data-slide-right': oneWay('renderSidebarRight'),

  navSlideStatus: inject('ui-navigation'),

  navWidth: computed('renderLogo', 'logoWidth', function() {
    if (get(this, 'renderLogo')) {
      const width = get(this, 'logoWidth');
      return width ? htmlSafe(`width: ${width};`) : null;
    }
    return null;
  }),

  xlink: computed('logo', function() {
    const icon = get(this, 'logo');
    return icon
      ? htmlSafe(`<use xlink:href="#${icon.split(' ')[0]}"></use>`)
      : null;
  }),

  renderSidebar: computed('sidebar', function() {
    const sidebar = get(this, 'sidebar')
    if (isNone(sidebar)) return false
    if (typeof sidebar === 'boolean') return true

    const argv = sidebar.split(' ')
    if (argv.length === 1) return window.device[argv[0]]()
    return window.device[argv[0]]() || window.device[argv[1]]()
  }),

  renderLogo: computed('logo', function() {
    const logo = get(this, 'logo')
    if (isNone(logo)) return false

    const argv = logo.split(' ')
    if (argv.length === 1) return true
    if (argv.length === 2) return window.device[argv[1]]()
    return window.device[argv[1]]() || window.device[argv[2]]()
  }),

  renderSidebarRight: computed('sidebarRight', function() {
    const sidebar = get(this, 'sidebarRight')
    if (isNone(sidebar)) return false
    if (typeof sidebar === 'boolean') return true

    const argv = sidebar.split(' ')
    if (argv.length === 1) return window.device[argv[0]]()
    return window.device[argv[0]]() || window.device[argv[1]]()
  }),

  actions: {
    handleToggleSlide(slideId, slide){
      get(this, 'navSlideStatus').toggle(slideId, slide);
    }
  }
});
