export default [
  '{{company.legal_entity_type}} {{company.suffix}}{{company.suffix}}',
  '{{company.legal_entity_type}} {{company.suffix}}{{company.suffix}}{{company.suffix}}',
  '{{company.legal_entity_type}} {{location.city_name}}{{company.suffix}}',
  '{{company.legal_entity_type}} {{location.city_name}}{{company.suffix}}{{company.suffix}}',
  '{{company.legal_entity_type}} {{location.city_name}}{{company.suffix}}{{company.suffix}}{{company.suffix}}',
  '{{company.legal_entity_type}} {{person.first_name.female}}',
  '{{company.legal_entity_type}} {{person.first_name.male}}',
  '{{company.legal_entity_type}} {{person.last_name.male}}',
];
