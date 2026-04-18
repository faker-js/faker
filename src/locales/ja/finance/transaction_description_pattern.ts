export default [
  '{{company.name}}での取引により、{{finance.currencyCode}} {{finance.amount}}がカード末尾****{{string.numeric(4)}}を使用して口座末尾***{{string.numeric(4)}}に請求されました。',
  '{{finance.currencyCode}} {{finance.amount}}の{{finance.transactionType}}が{{company.name}}で処理されました。カード末尾****{{string.numeric(4)}}、口座末尾***{{string.numeric(4)}}が使用されています。',
  '{{finance.currencyCode}} {{finance.amount}}の支払いが{{company.name}}で処理されました。この取引にはカード末尾****{{string.numeric(4)}}と口座末尾***{{string.numeric(4)}}がリンクされています。',
  '{{finance.transactionType}}が{{company.name}}で確認されました。金額は{{finance.currencyCode}} {{finance.amount}}で、カード末尾****{{string.numeric(4)}}と口座末尾***{{string.numeric(4)}}が関連付けられています。',
  'あなたの取引が完了しました。{{company.name}}で{{finance.currencyCode}} {{finance.amount}}の{{finance.transactionType}}が行われ、カード末尾****{{string.numeric(4)}}と口座末尾***{{string.numeric(4)}}が利用されました。',
  'カード末尾****{{string.numeric(4)}}を使用して、{{company.name}}にて{{finance.currencyCode}} {{finance.amount}}の{{finance.transactionType}}が行われました。口座末尾***{{string.numeric(4)}}が利用されています。',
  'カード末尾****{{string.numeric(4)}}を使用して、{{finance.currencyCode}} {{finance.amount}}の{{finance.transactionType}}が{{company.name}}で実施されました。口座末尾***{{string.numeric(4)}}が利用されています。',
  '取引が成功しました。{{company.name}}で{{finance.currencyCode}} {{finance.amount}}の{{finance.transactionType}}が実施され、カード末尾****{{string.numeric(4)}}と口座末尾***{{string.numeric(4)}}が使用されています。',
  '取引通知: {{finance.currencyCode}} {{finance.amount}}の{{finance.transactionType}}が発生しました。{{company.name}}でカード末尾****{{string.numeric(4)}}と口座末尾***{{string.numeric(4)}}が使用されています。',
  '金額{{finance.currencyCode}} {{finance.amount}}の{{finance.transactionType}}が{{company.name}}で行われました。カード末尾****{{string.numeric(4)}}と口座末尾***{{string.numeric(4)}}が使用されています。',
];
