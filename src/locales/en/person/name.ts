export default [
  ['{{person.first_name}} {{person.last_name}}', 7],
  ['{{person.prefix}} {{person.first_name}} {{person.last_name}}', 1],
  ['{{person.first_name}} {{person.last_name}} {{person.suffix}}', 1],
  [
    '{{person.prefix}} {{person.first_name}} {{person.last_name}} {{person.suffix}}',
    1,
  ],
] as [string, number][];
