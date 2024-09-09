export default [
  '{{company.prefix}} {{person.last_name.female}} {{company.legal_entity_type}}',
  '{{company.prefix}} {{person.last_name.male}}',
  '{{company.prefix}} {{person.last_name.male}} {{company.legal_entity_type}}',
  '{{person.last_name.male}} un {{person.last_name.male}}',
  '{{person.last_name.male}}, {{person.last_name.male}} un {{person.last_name.male}}',
];
