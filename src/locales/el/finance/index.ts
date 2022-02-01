import type { FinanceDefinitions } from '../../../definitions';
import account_type from './account_type';
import currency from './currency';
import transaction_type from './transaction_type';

const finance: Partial<FinanceDefinitions> = {
  account_type,
  currency,
  transaction_type,
};

export default finance;
