import Helper from 'ember-helper'

export const device = ([name]) => {
  return window.device[name]();
};

export default Helper.helper(device);
