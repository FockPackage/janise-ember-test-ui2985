export default {
  name: 'theme',

  initialize(application) {
    application.inject('component', 'theme', 'service:theme');
    application.inject('controller', 'theme', 'service:theme');
    application.inject('route', 'theme', 'service:theme');
  }
};
