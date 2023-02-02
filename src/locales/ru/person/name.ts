export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 1 },
  { value: '{{person.lastName}} {{person.firstName}}', weight: 1 },
  {
    value: '{{person.firstName}} {{person.middleName}} {{person.lastName}}',
    weight: 1,
  },
  {
    value: '{{person.lastName}} {{person.firstName}} {{person.middleName}}',
    weight: 1,
  },
];
