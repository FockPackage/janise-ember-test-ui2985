import Component from "ember-component";
import get from 'ember-metal/get';

export default Component.extend({
  theme: 'bright',
  oauth: [
    {label: 'Facebook', icon: 'social-16px_logo-fb-simple'},
    {label: 'Twitter', icon: 'social-16px_logo-twitter'},
    {label: 'Google', icon: 'social-16px_logo-google-plus'},
  ],
  login: [
    {footerLabel: 'Don’t have an account?', footerLinke: 'Sign Up'},
    {footerLabel: 'If you forgot your password, just', footerLinke: 'contact us.'}
  ],

  actions: {
    loginSuccessCallback() {
      get(this, 'notification').success('login success!');
    }
  }
});
