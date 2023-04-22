export default [
  { value: '{{person.female_last_name}}', weight: 8 },
  {
    value: '{{person.female_last_name}}-{{person.female_last_name}}',
    weight: 2,
  },
];
