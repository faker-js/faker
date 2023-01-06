export default [
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.middleName}} {{person.lastName}}',
    weight: 2,
  },
  { value: '{{person.firstName}} {{person.lastName}}', weight: 5 },
];
