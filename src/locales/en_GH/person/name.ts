export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 1 },
  {
    value: '{{person.firstName}} {{person.lastName}}-{{person.lastName}}',
    weight: 1,
  },
];
