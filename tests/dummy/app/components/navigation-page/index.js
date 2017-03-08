import Component from 'ember-component';
import faker from 'faker';

export default Component.extend({
  logoImage: faker.image.avatar(),
});
