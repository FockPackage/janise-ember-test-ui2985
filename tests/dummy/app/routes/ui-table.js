import Route from 'ember-route';
import faker from 'faker';

faker.locale = "en";
export default Route.extend({
  model(){
    return {
      table1: {
        theads: [
          {
            label: 'User Name',
          },
          {
            label: 'Account Name',
          },
          {
            label: 'Phone Number',
          },
          {
            label: 'Date Between',
          }
        ],
        tbodys: [
          [
            {
              item: {
                label: faker.internet.userName(),
                image: faker.image.avatar(),
                size: '36',
                viewBox: '36',
                radius: '12',
              },
            },
            {
              dropdown: {
                label: 'account',
                color: 'stroked',
                size: 'medium',
                icon: 'ui-16px-1_bell-53',
                horizontalPosition: 'left',
                items: [
                  {
                    label: "content1",
                    icon: 'ui-16px-2_grid-square',
                  },
                  {
                    label: "content2",
                  },
                  {
                    label: "content3",
                    icon: 'ui-16px-1_settings-gear-63',
                  }
                ]
              },
            },
            {
              button: {
                label: faker.phone.phoneNumberFormat(),
              },
            },
            {
              text: {
                label: faker.date.between('2016-01-01', '2016-12-31'),
              }
            },
          ],
          [
            {
              item: {
                label: faker.internet.userName(),
                image: faker.image.avatar(),
                size: '36',
                viewBox: '36',
                radius: '12',
              },
            },
            {
              text: {
                label: faker.finance.accountName(),
              },
            },
            {
              button: {
                label: faker.phone.phoneNumberFormat(),
                color: 'lime',
              },
            },
            {
              text: {
                label: faker.date.between('2016-01-01', '2016-12-31'),
              }
            },
          ],
          [
            {
              item: {
                label: faker.internet.userName(),
                image: faker.image.avatar(),
                size: '36',
                viewBox: '36',
                radius: '12',
              },
            },
            {
              text: {
                label: faker.finance.accountName(),
              },
            },
            {
              button: {
                label: faker.phone.phoneNumberFormat(),
                color: 'lime',
              },
            },
            {
              text: {
                label: faker.date.between('2016-01-01', '2016-12-31'),
              }
            },
          ]
        ]
      },
      table2: {
        tbodys: [
          [
            {
              item: {
                label: faker.internet.userName(),
                image: faker.image.avatar(),
                size: '36',
                viewBox: '36',
                radius: '12',
              },
            },
            {
              dropdown: {
                label: 'account',
                color: 'stroked',
                size: 'medium',
                icon: 'ui-16px-1_bell-53',
                horizontalPosition: 'left',
                items: [
                  {
                    label: "content1",
                    icon: 'ui-16px-2_grid-square',
                  },
                  {
                    label: "content2",
                  },
                  {
                    label: "content3",
                    icon: 'ui-16px-1_settings-gear-63',
                  }
                ]
              },
            },
            {
              button: {
                label: faker.phone.phoneNumberFormat(),
              },
            },
            {
              text: {
                label: faker.date.between('2016-01-01', '2016-12-31'),
              }
            },
          ],
          [
            {
              item: {
                label: faker.internet.userName(),
                image: faker.image.avatar(),
                size: '36',
                viewBox: '36',
                radius: '12',
              },
            },
            {
              text: {
                label: faker.finance.accountName(),
              },
            },
            {
              button: {
                label: faker.phone.phoneNumberFormat(),
                color: 'lime',
              },
            },
            {
              text: {
                label: faker.date.between('2016-01-01', '2016-12-31'),
              }
            },
          ],
          [
            {
              item: {
                label: faker.internet.userName(),
                image: faker.image.avatar(),
                size: '36',
                viewBox: '36',
                radius: '12',
              },
            },
            {
              text: {
                label: faker.finance.accountName(),
              },
            },
            {
              button: {
                label: faker.phone.phoneNumberFormat(),
                color: 'lime',
              },
            },
            {
              text: {
                label: faker.date.between('2016-01-01', '2016-12-31'),
              }
            },
          ]
        ]
      }
    }
  }
});
