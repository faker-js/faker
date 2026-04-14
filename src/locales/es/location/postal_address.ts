export default [
  '{{location.streetAddress}}, {{location.secondaryAddress}}\n{{location.zipCode}} {{location.city}}',
  '{{location.streetAddress}}\n{{location.zipCode}} {{location.city}}',
  '{{location.streetAddress}}, {{location.secondaryAddress}}\n{{location.zipCode}} {{location.city}}\n{{location.county}}',
  '{{location.streetAddress}}\n{{location.zipCode}} {{location.city}}\n{{location.county}}',
];
