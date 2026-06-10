const suffixes = ['## ##?', '# #??'];
const prefixes = ['CF', 'CH', 'HR', 'LD', 'LL', 'NP', 'SA', 'SY'];

export default prefixes.flatMap((prefix) =>
  suffixes.map((suffix) => prefix + suffix)
);
