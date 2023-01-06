export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 1 },
  { value: '{{person.lastName}} {{person.firstName}}', weight: 1 },
  {
    value: '{{person.firstName}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
];
