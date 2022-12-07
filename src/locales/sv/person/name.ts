export default [
  ['{{person.prefix}} {{person.first_name}} {{person.last_name}}', 1],
  ['{{person.first_name}} {{person.last_name}} {{person.suffix}}', 1],
  ['{{person.first_name}} {{person.last_name}}', 8],
  ['{{person.first_name}} {{person.last_name}} {{person.last_name}}', 1],
] as [string, number][];
