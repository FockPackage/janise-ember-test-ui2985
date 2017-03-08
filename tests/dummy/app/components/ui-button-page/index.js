import Component from "ember-component";
import set from "ember-metal/set";

export default Component.extend({
  size: 'medium',

  actions: {
    setButtonSize(size){
      set(this,'size', size);
    },
  },
});
