import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import inject from 'ember-service/inject';
import RSVP from 'rsvp';

export default BaseAuthenticator.extend({
  ajax: inject(),

  authenticate(url, data) {
    return this.get('ajax').post(url, { data })
  },

  restore(data) {
    return RSVP.resolve(data);
  }
});
