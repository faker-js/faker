export default {
  female: [
    { value: '{{person.female_last_name}}', weight: 8 },
    {
      value: '{{person.female_last_name}}-{{person.female_last_name}}',
      weight: 2,
    },
  ],
  male: [
    { value: '{{person.male_last_name}}', weight: 8 },
    { value: '{{person.male_last_name}}-{{person.male_last_name}}', weight: 2 },
  ],
};
