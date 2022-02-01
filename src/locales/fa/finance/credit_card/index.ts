import type { FinanceDefinitions } from '../../../../definitions';
import mastercard from './mastercard';
import visa from './visa';

const credit_card: FinanceDefinitions['credit_card'] = {
  mastercard,
  visa,
};

export default credit_card;
