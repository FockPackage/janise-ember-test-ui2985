import Helper from 'ember-helper'

export const stringToArray = (argv) => {
  return argv[0].replace(/\s+/g, '').split(',');
};

export default Helper.helper(stringToArray)
