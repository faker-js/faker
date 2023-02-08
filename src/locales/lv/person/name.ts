export default [
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} {{person.suffix}}',
    weight: 1,
  },
  { value: '{{person.firstName}} {{person.lastName}}', weight: 7 },
  { value: '{{person.lastName}} {{person.firstName}}', weight: 2 },
  {
    value: '{{person.firstName}} {{person.firstName}} {{person.lastName}}',
    weight: 2,
  },
  {
    value: '{{person.firstName}} {{person.lastName}}-{{person.lastName2}}',
    weight: 2,
  },
];
