export default [
  ['{{person.prefix}} {{person.first_name}} {{person.last_name}}', 1],
  ['{{person.first_name}} {{person.middle_name}} {{person.last_name}}', 2],
  ['{{person.first_name}} {{person.last_name}}', 5],
] as [string, number][];
