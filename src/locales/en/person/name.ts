export default [
  ...Array(7).fill('{{person.first_name}} {{person.last_name}}'), //70% of the time we want a first and last name
  '{{person.prefix}} {{person.first_name}} {{person.last_name}}', //10% of the time add a prefix
  '{{person.first_name}} {{person.last_name}} {{person.suffix}}', //10% of the time add a suffix
  '{{person.prefix}} {{person.first_name}} {{person.last_name}} {{person.suffix}}', //10% of the time add both
];
