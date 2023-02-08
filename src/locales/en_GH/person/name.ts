export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 1 },
  {
    value: '{{person.firstName}} {{person.lastName}}-{{person.lastName2}}',
    weight: 1,
  },
];
