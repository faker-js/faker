export default {
  generic: [
    { value: '{{person.last_name}}', weight: 9 },
    { value: '{{person.last_name}}-{{person.last_name}}', weight: 1 },
  ],
};
