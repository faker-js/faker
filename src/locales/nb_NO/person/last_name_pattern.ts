export default {
  generic: [
    { value: '{{person.last_name}}', weight: 8 },
    { value: '{{person.last_name}} {{person.last_name}}', weight: 2 },
  ],
};
