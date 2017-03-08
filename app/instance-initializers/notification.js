export default {
  name: 'notification',

  initialize(application) {
    application.inject('route', 'notification', 'service:ui-notification');
    application.inject('component', 'notification', 'service:ui-notification');
    application.inject('controller', 'notification', 'service:ui-notification');
  }
};
