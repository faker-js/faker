const { allLocales, allFakers } = require('@faker-js/faker');

const snakeCase = (str) => {
  if (str == 'person.firstName') {
    return ['person', 'first_name'];
  }
  if (str == 'person.lastName') {
    return ['person', 'last_name'];
  }
  return str.split('.');
};

for (let locale of Object.keys(allLocales)) {
  let allKeys = new Set();
  const faker = allFakers[locale];
  const definitions = allLocales[locale];
  console.log(
    `\n## ${definitions.metadata.title} (${definitions.metadata.code})\n`
  );
  let patterns = definitions.location?.city_pattern;
  if (patterns) {
    for (let pattern of patterns) {
      console.log(`- \`${pattern}\` e.g. ${faker.helpers.fake(pattern)}`);
      const placeholders = pattern.match(/{{[\w\.]+}}/g);
      for (let placeholder of placeholders || []) {
        let [module, key] = snakeCase(placeholder.replace(/{{|}}/g, ''));
        allKeys.add(key);
        if (!definitions[module][key]) {
          console.log(
            `- ⚠️ reference to  ${module}.${key} which is not in locale ${locale}`
          );
        }
      }

      const weird =
        pattern === '{{location.city_prefix}}' ||
        pattern === '{{location.city_suffix}}';
      if (weird) {
        console.log(`- ⚠️  prefix without city_name in ${locale}`);
      }
    }
    const possibleKeys = [
      'city_prefix',
      'first_name',
      'city_suffix',
      'last_name',
      'city_name',
      'noun',
      'adjective',
      'city_infix',
      'male_first_name',
    ];
    for (let key of possibleKeys) {
      if (definitions.location[key] && !allKeys.has(key)) {
        console.log(`- ⚠️ ${key} is defined but unused in ${locale}`);
      }
    }
  } else {
    console.log('- ⚠️ No city patterns defined');
  }
}
