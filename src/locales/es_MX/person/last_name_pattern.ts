export default {
  generic: [
    {
      value: '{{person.last_name.generic}} {{person.last_name.generic}}',
      weight: 5,
    },
    {
      value: '{{person.last_name.generic}} de {{person.last_name.generic}}',
      weight: 1,
    },
  ],
};
