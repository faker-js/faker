export default [
  { value: '{{person.firstName}} {{person.lastName}}', weight: 49 },
  {
    value: '{{person.prefix}} {{person.firstName}} {{person.lastName}}',
    weight: 7,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} {{person.suffix}}',
    weight: 7,
  },
  {
    value:
      '{{person.prefix}} {{person.firstName}} {{person.lastName}} {{person.suffix}}',
    weight: 1,
  },
];
