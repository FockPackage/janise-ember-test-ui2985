import Route from "ember-route";

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default Route.extend({
  model() {
    return {
      data: [
        {x: new Date(2017, 0, 1), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 2), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 3), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 4), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 5), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 6), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 7), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 8), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 9), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 10), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 11), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 12), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 13), y: generateRandomInteger(0, 100)},
        {x: new Date(2017, 0, 14), y: generateRandomInteger(0, 100)},
      ],
      margin: {t: 20, r: 20, b: 36, l: 36}
    }


    // return [
    //   {x: 'Alice', y: generateRandomInteger(0, 100)},
    //   {x: 'Billy', y: generateRandomInteger(0, 100)},
    //   {x: 'Cindy', y: generateRandomInteger(0, 100)},
    //   {x: 'David', y: generateRandomInteger(0, 100)},
    //   {x: 'Emily', y: generateRandomInteger(0, 100)},
    //   {x: 'Fayez', y: generateRandomInteger(0, 100)},
    //   {x: 'Grace', y: generateRandomInteger(0, 100)},
    // ]
  }
})
