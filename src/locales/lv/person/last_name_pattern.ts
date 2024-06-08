export default {
  female: [
    { value: '{{person.last_name.female}}', weight: 8 },
    {
      value: '{{person.last_name.female}}-{{person.last_name.female}}',
      weight: 2,
    },
  ],
  male: [
    { value: '{{person.male_last_name}}', weight: 8 },
    { value: '{{person.male_last_name}}-{{person.male_last_name}}', weight: 2 },
  ],
};
