import type { NameDefinitions } from '../../../definitions';
import binary_gender from './binary_gender';
import female_first_name from './female_first_name';
import first_name from './first_name';
import gender from './gender';
import last_name from './last_name';
import male_first_name from './male_first_name';
import name_ from './name';
import prefix from './prefix';
import suffix from './suffix';
import title from './title';

const name: NameDefinitions = {
  binary_gender,
  gender,

  prefix,

  first_name,
  female_first_name,
  male_first_name,

  last_name,

  suffix,

  name: name_,

  title,
};

export default name;
