import Component from 'ember-component';
import faker from 'faker';

export default Component.extend({
  image: [
    {image: faker.image.avatar()},
    {image: faker.image.avatar()},
    {image: faker.image.avatar()},
    {image: faker.image.avatar()},
    {image: faker.image.avatar()},
    {image: faker.image.avatar()},
    {image: faker.image.avatar()},
    {image: faker.image.avatar()},
  ],
});
