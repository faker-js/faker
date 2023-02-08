export default [
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} {{person.suffix}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.firstName}} {{person.lastName2}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} {{person.lastName2}}',
    weight: 1,
  },
  { value: '{{person.firstName}} {{person.lastName}}', weight: 8 },
];
