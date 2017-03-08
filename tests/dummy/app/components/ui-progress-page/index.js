import Component from "ember-component";
import set from "ember-metal/set";
import get from "ember-metal/get";

export default Component.extend({
  progress: 10,
  actions: {
    setProgressUp(){
      const progress = get(this, 'progress');
      let lastProgress = progress + 10;
      lastProgress > 100 && (lastProgress = 100);
      set(this, 'progress', lastProgress);
    },
    setProgressDown(){
      const progress = get(this, 'progress');
      let lastProgress = progress - 10;
      lastProgress < 0 && (lastProgress = 0);
      set(this, 'progress', lastProgress);
    },
  },
});
