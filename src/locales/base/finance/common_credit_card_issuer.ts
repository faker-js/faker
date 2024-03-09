import type { CreditCardIssuerType } from '../../../modules/finance';

export default [
  'american_express',
  'diners_club',
  'discover',
  'jcb',
  'maestro',
  'mastercard',
  'unionpay',
  'visa',
] satisfies CreditCardIssuerType[];
