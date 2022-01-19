import type { LocaleDefinition } from '../..';
import { address } from './address';
import { animal } from './animal';
import { app } from './app';
import { business } from './business';
import { cell_phone } from './cell_phone';
import { commerce } from './commerce';
import { company } from './company';
import { database } from './database';
import { date } from './date';
import { finance } from './finance';
import { hacker } from './hacker';
import { internet } from './internet';
import { lorem } from './lorem';
import { music } from './music';
import { name } from './name';
import { phone_number } from './phone_number';
import { system } from './system';
import { team } from './team';
import { vehicle } from './vehicle';
import { word } from './word';

const en: LocaleDefinition = {
  title: 'English',
  separator: ' & ',
  address: address,
  animal: animal,
  company: company,
  internet: internet,
  database: database,
  lorem: lorem,
  name: name,
  phone_number: phone_number,
  cell_phone: cell_phone,
  business: business,
  commerce: commerce,
  team: team,
  hacker: hacker,
  app: app,
  finance: finance,
  date: date,
  system: system,
  vehicle: vehicle,
  music: music,
  word: word,
};

export default en;
