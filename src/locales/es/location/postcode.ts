// Spanish postal codes are five digits whose first two digits identify the
// province, from 01 (Álava) to 52 (Melilla), followed by three digits.
// The 00xxx and 53xxx-99xxx ranges are not assigned, so they are excluded here.
// See https://en.wikipedia.org/wiki/Postal_codes_in_Spain
export default Array.from(
  { length: 52 },
  (_, index) => `${(index + 1).toString().padStart(2, '0')}###`
);
