import { faker } from './src';

console.log(faker.helpers.multiple(faker.food.description, { count: 20 }));
