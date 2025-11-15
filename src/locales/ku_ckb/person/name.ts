export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 25 },
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 10,
  },
  {
    value: '{{person.firstName}} {{person.middleName}} {{person.lastName}}',
    weight: 10,
  },
];
