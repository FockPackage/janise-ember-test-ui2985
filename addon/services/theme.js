import Service from 'ember-service';
import set from 'ember-metal/set';
import get from 'ember-metal/get';

export default Service.extend({
  name: 'bright',

  setTheme(name, self = this) {
    set(self, 'name', name);
  },

  switchTheme(self = this) {
    set(self, 'name', get(self, 'name') === 'bright' ? 'dark' : 'bright');
  }
});
