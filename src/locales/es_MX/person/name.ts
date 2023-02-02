export default [
  {
    value:
      '{{person.prefix}} {{person.firstName}} {{person.lastName}} {{person.lastName}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} de {{person.lastName}}',
    weight: 3,
  },
  {
    value:
      '{{person.suffix}} {{person.firstName}} {{person.lastName}} {{person.lastName}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} {{person.lastName}}',
    weight: 5,
  },
];
