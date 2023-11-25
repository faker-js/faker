export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 1 },
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
];
