export default [
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
  { value: '{{person.firstName}} {{person.lastName}}', weight: 5 },
  { value: '{{person.lastName}} {{person.firstName}}', weight: 5 },
];
