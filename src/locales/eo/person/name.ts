export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 7 },
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
];
