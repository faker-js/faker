export default [
  {
    value:
      '{{person.prefix}} {{person.firstName}} {{person.lastName}} {{person.lastName2}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} de {{person.lastName2}}',
    weight: 3,
  },
  {
    value:
      '{{person.suffix}} {{person.firstName}} {{person.lastName}} {{person.lastName2}}',
    weight: 1,
  },
  {
    value: '{{person.firstName}} {{person.lastName}} {{person.lastName2}}',
    weight: 5,
  },
];
