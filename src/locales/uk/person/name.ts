export default [
  ['{{person.first_name}} {{person.last_name}}', 1],
  ['{{person.last_name}} {{person.first_name}}', 1],
  ['{{person.first_name}} {{person.middle_name}} {{person.last_name}}', 1],
  ['{{person.last_name}} {{person.first_name}} {{person.middle_name}}', 1],
] as [string, number][];
