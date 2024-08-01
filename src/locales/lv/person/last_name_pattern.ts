export default {
  female: [
    { value: '{{person.last_name.female}}', weight: 8 },
    {
      value: '{{person.last_name.female}}-{{person.last_name.female}}',
      weight: 2,
    },
  ],
  male: [
    { value: '{{person.last_name.male}}', weight: 8 },
    { value: '{{person.last_name.male}}-{{person.last_name.male}}', weight: 2 },
  ],
};
