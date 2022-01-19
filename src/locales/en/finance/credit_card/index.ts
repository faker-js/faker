import { american_express } from "./american_express";
import { diners_club } from "./diners_club";
import { discover } from "./discover";
import { instapayment } from "./instapayment";
import { jcb } from "./jcb";
import { laser } from "./laser";
import { maestro } from "./maestro";
import { mastercard } from "./mastercard";
import { solo } from "./solo";
import { Switch } from "./switch";
import { visa } from "./visa";

export interface CreditCardDefinition {
  [index: string]: any,
}

export const credit_card: CreditCardDefinition = {
  visa: visa,
  mastercard: mastercard,
  discover: discover,
  american_express: american_express,
  diners_club: diners_club,
  jcb: jcb,
  switch: Switch,
  solo: solo,
  maestro: maestro,
  laser: laser,
  instapayment: instapayment,
};
