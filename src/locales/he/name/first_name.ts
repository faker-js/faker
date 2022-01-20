import female_first_name from './female_first_name';
import male_first_name from './male_first_name';

const names: string[] = female_first_name.concat(male_first_name);
names.sort();

export default names;
