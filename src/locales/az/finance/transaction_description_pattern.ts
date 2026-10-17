export default [
  'Hesab ***{{string.numeric(4)}} üzrə {{finance.transactionType}} əməliyyatı: {{finance.amount}} {{finance.currencyCode}}. Şirkət: {{company.name}}. Kart: ****{{string.numeric(4)}}.',
  '{{company.name}} üzrə əməliyyat: {{finance.transactionType}}. Məbləğ: {{finance.amount}} {{finance.currencyCode}}. Kartın son rəqəmləri: {{string.numeric(4)}}. Hesabın son rəqəmləri: {{string.numeric(4)}}.',
  '{{finance.transactionType}} əməliyyatı qeydə alındı. {{company.name}}, {{finance.amount}} {{finance.currencyCode}}. Kart: ****{{string.numeric(4)}}. Hesab: ***{{string.numeric(4)}}.',
  'Əməliyyat növü: {{finance.transactionType}}. Məbləğ: {{finance.amount}} {{finance.currencyCode}}. Şirkət: {{company.name}}. Kart: ****{{string.numeric(4)}}. Hesab: ***{{string.numeric(4)}}.',
];
