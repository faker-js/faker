import type { FinanceDefinitions } from '../../../definitions';
import account_type from './account_type';
import credit_card from './credit_card';
import currency from './currency';
import transaction_type from './transaction_type';

const finance: FinanceDefinitions = {
  account_type,
  credit_card,
  currency,
  transaction_type,
};

export default finance;
