import type { VehicleDefinitions } from '../../../definitions';
import bicycle from './bicycle';
import fuel from './fuel';
import manufacturer from './manufacturer';
import model from './model';
import type_ from './type';

const vehicle = {
  bicycle,
  fuel,
  manufacturer,
  model,
  type: type_,
} as Partial<VehicleDefinitions>;

export default vehicle;
