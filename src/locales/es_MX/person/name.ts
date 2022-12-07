export default [
  [
    '{{person.prefix}} {{person.first_name}} {{person.last_name}} {{person.last_name}}',
    1,
  ],
  ['{{person.first_name}} {{person.last_name}} de {{person.last_name}}', 3],
  [
    '{{person.suffix}} {{person.first_name}} {{person.last_name}} {{person.last_name}}',
    1,
  ],
  ['{{person.first_name}} {{person.last_name}} {{person.last_name}}', 5],
] as [string, number][];
