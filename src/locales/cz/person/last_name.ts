import female_last_name from './female_last_name';
import male_last_name from './male_last_name';

export default [...new Set([...female_last_name, ...male_last_name])];
