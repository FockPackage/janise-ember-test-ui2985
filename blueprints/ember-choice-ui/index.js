const RSVP = require('rsvp');

module.exports = {
  name: 'ember-choice-ui',

  description: 'install all dependencies needed',

  normalizeEntityName() {},

  aferInstall() {
    return RSVP.all([
      this.addBowerPackageToProject('devicejs')
    ]);
  }
}
