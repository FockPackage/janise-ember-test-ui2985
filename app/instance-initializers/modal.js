export default {
  name: 'modal',

  initialize(application) {
    application.inject('route', 'modal', 'service:ui-modal');
    application.inject('component', 'modal', 'service:ui-modal');
    application.inject('controller', 'modal', 'service:ui-modal');
  }
};
