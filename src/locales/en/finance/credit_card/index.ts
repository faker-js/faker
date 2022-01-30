import type { FinanceCreditCardDefinitions } from '../../../../definitions';
import american_express from './american_express';
import diners_club from './diners_club';
import discover from './discover';
import instapayment from './instapayment';
import jcb from './jcb';
import laser from './laser';
import maestro from './maestro';
import mastercard from './mastercard';
import solo from './solo';
import switch_ from './switch';
import visa from './visa';

const credit_card: FinanceCreditCardDefinitions = {
  american_express,
  diners_club,
  discover,
  instapayment,
  jcb,
  laser,
  maestro,
  mastercard,
  solo,
  switch: switch_,
  visa,
};

export default credit_card;
