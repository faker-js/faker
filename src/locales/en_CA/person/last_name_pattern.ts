export default {
  generic: [
    { value: '{{person.last_name.generic}}', weight: 95 },
    {
      value: '{{person.last_name.generic}}-{{person.last_name.generic}}',
      weight: 5,
    },
  ],
};
