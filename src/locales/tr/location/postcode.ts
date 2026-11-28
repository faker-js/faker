// Turkish postal codes are five digits whose first two digits are the
// license plate code of the province, from 01 (Adana) to 81 (Düzce),
// followed by three digits. The 00xxx and 82xxx-99xxx ranges are not
// assigned, so they are excluded here.
// See https://en.wikipedia.org/wiki/Postal_codes_in_Turkey
export default Array.from(
  { length: 81 },
  (_, index) => `${(index + 1).toString().padStart(2, '0')}###`
);
