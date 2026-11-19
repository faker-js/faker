import areaCodes from '../area_code';
import mobile from './mobile';

// Keep fixed-line and service codes, including Northern Cyprus (392).
const areaAndServiceCodes = areaCodes.filter((code) => !code.startsWith('5'));

const formats = [
  ...areaAndServiceCodes.map((code) => `+90${code}#######`),
  ...mobile.map((format) => `+90${format.slice(1)}`),
];

export default formats;
