export default [
  ['{{person.prefix}} {{person.first_name}} {{person.last_name}}', 1],
  ['{{person.first_name}} {{person.last_name}}, {{person.suffix}}', 1],
  ['{{person.first_name}} {{person.last_name}}', 8],
] as [string, number][];
