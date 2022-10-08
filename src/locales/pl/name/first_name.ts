import female_first_name from './female_first_name';
import male_first_name from './male_first_name';

export default [...new Set([...female_first_name, ...male_first_name])];
