export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 99 },
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
];
