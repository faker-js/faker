import type { FinanceCreditCardDefinitions } from '../../../../definitions';
import mastercard from './mastercard';
import visa from './visa';

const credit_card: FinanceCreditCardDefinitions = {
  mastercard,
  visa,
};

export default credit_card;
