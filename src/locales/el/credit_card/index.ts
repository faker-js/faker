import type { FinanceDefinitions } from '../../../definitions';
import american_express from './american_express';
import discover from './discover';
import maestro from './maestro';
import mastercard from './mastercard';
import visa from './visa';

const credit_card: FinanceDefinitions['credit_card'] = {
  american_express,
  discover,
  maestro,
  mastercard,
  visa,
};

export default credit_card;
