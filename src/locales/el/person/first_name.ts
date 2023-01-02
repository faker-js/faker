// We don't have a generic first name list for this locale
// So simply concatenate male and female lists and remove any duplicates
// This avoids falling back to fallback locale
import { mergeArrays } from './../../../internal/merge';
import female_first_name from './female_first_name';
import male_first_name from './male_first_name';

export default mergeArrays(female_first_name, male_first_name);
