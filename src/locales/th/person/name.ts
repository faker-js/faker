export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 100 },
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
];
