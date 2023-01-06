export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 8 },
  { value: '{{person.lastName}} {{person.firstName}}', weight: 1 },
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
];
