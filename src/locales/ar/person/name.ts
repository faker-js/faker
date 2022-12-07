export default [
  ['{{person.prefix}} {{person.first_name}} {{person.last_name}}', 1],
  ['{{person.first_name}} {{person.last_name}}', 5],
  ['{{person.last_name}} {{person.first_name}}', 5],
] as [string, number][];
