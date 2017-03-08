import Service from 'ember-service';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';

import layout from '../templates/components/ui-modal';
import confirmLayout from '../templates/components/ui-modal/confirm';
import alertLayout from '../templates/components/ui-modal/alert';


export default Service.extend({
  dialog: inject(),

  show(template, options = {}) {
    return get(this, 'dialog').show(layout, template, null, options, 'ui-modal');
  },

  confirm(template, options = {}) {
    return get(this, 'dialog').show(confirmLayout, template, null, options, 'ui-modal');
  },

  alert(template, options = {}) {
    return get(this, 'dialog').show(alertLayout, template, null, options, 'ui-modal');
  },

});
