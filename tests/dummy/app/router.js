import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('ui-icon', function() {
    this.route('symbols');
    this.route('logo');
    this.route('profile');
  });
  this.route('ui-button', function() {
    this.route('round');
    this.route('floating');
    this.route('category');
    this.route('tag');
    this.route('symbols');
    this.route('text');
  });
  this.route('ui-input', function() {
    this.route('icon');
    this.route('spinner');
    this.route('warning');
    this.route('background');
  });
  this.route('ui-checkbox', function() {
    this.route('switch');
  });
  this.route('ui-radio', function() {
    this.route('switch');
  });
  this.route('ui-notification');
  this.route('ui-progressive');
  this.route('ui-pane');
  this.route('ui-table');
  this.route('ui-tabs');
  this.route('ui-dropdown', function() {
    this.route('position');
    this.route('input');
    this.route('control');
    this.route('contents');
  });
  this.route('ui-navigation');
  this.route('ui-item', function() {
    this.route('icon');
    this.route('profile');
    this.route('custom');
    this.route('badges');
    this.route('hint');
    this.route('attachments');
  });
  this.route('ui-sidebar');
  this.route('ui-modal');
  this.route('ui-popup');
  this.route('ui-grid');
  this.route('ui-progress');
  this.route('ui-section-sortable');
  this.route('ui-loader');
  this.route('ui-login', function() {
    this.route('singup');
    this.route('forgot');
    this.route('reset');
  });
  this.route('ui-d3-chart');
  this.route('ui-pagination');
});

export default Router;
