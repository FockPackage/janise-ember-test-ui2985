import Helper from 'ember-helper'
import { htmlSafe as _htmlSafe } from 'ember-string';

export const htmlSafe = ([string]) => {
  return _htmlSafe(string || '')
};

export default Helper.helper(htmlSafe);
