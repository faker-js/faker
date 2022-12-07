export default [
  ['{{person.first_name}} {{person.last_name}}', 8],
  ['{{person.last_name}} {{person.first_name}}', 1],
  ['{{person.prefix}} {{person.first_name}} {{person.last_name}}', 1],
] as [string, number][];
