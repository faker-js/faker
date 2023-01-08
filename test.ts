import { faker } from './src';

console.log(faker.string.nanoid());
console.log(faker.string.nanoid(10));
console.log(faker.string.nanoid({ min: 13, max: 37 }));
