export default [
  {
    value:
      '{{person.prefix}} {{person.firstName}} {{person.lastName}} {{person.lastName}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} {{person.lastName}}',
    weight: 9,
  },
];
