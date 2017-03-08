import Helper from 'ember-helper'

export const sum = (argv) => {
  return parseInt(argv[0]) + parseInt(argv[1]);
};

export default Helper.helper(sum)
