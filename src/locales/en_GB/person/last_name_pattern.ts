export default {
  generic: [
    { value: '{{person.last_name.generic}}', weight: 9 },
    {
      value: '{{person.last_name.generic}}-{{person.last_name.generic}}',
      weight: 1,
    },
  ],
};
