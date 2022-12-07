export default [
  ['{{person.prefix}} {{person.first_name}} {{person.last_name}}', 1],
  ['{{person.first_name}} {{person.last_name}} {{person.suffix}}', 1],
  ['{{person.first_name}} {{person.last_name}}', 7],
  ['{{person.last_name}} {{person.first_name}}', 2],
  ['{{person.first_name}} {{person.first_name}} {{person.last_name}}', 2],
  ['{{person.first_name}} {{person.last_name}}-{{person.last_name}}', 2],
] as [string, number][];
