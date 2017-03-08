import Route from 'ember-route';
import faker from 'faker';

faker.locale = "en";
export default Route.extend({
  model(){
    return [
      {
        route: 'ui-tabs',
        icon:'ui-16px-2_alert-circle-!',
        image: faker.image.avatar(),
        label: faker.internet.userName(),
      },
      {
        route: 'ui-table',
        icon:'ui-16px-2_alert-circle-!',
        image: faker.image.avatar(),
        label: faker.internet.userName(),
      },
      {
        route: 'ui-icon',
        icon:'ui-16px-2_alert-circle-!',
        image: faker.image.avatar(),
        label: faker.internet.userName(),
      }
    ]
  }
});
