import Helper from 'ember-helper'

export const addcommas = ([value]) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default Helper.helper(addcommas);
