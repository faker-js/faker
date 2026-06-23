// French postal codes are five digits whose leading digits identify the
// department: metropolitan departments use the prefixes 01-95 (followed by
// three digits), while the overseas departments and collectivities use 971-978,
// 984 and 986-989 (followed by two digits). The 00xxx, 96xxx, 980-983xx, 985xx
// and 99xxx ranges are not assigned, so they are excluded here. See #3550 and
// https://en.wikipedia.org/wiki/Postal_codes_in_France
const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

const metropolitan = range(1, 95).map(
  (department) => `${department.toString().padStart(2, '0')}###`
);

const overseas = [...range(971, 978), 984, ...range(986, 989)].map(
  (territory) => `${territory}##`
);

export default [...metropolitan, ...overseas];
