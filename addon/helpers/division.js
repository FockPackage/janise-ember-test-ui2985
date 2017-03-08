/**
 * Created by cform on 17/2/23.
 */
import Helper from 'ember-helper';

export const division = (argv)=>{

  return Math.round(argv[0] * 100 / (argv[1] <=0 ? 0.001 : argv[1]));
} ;

export default Helper.helper(division);
