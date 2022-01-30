import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to vehicles.
 */
export interface VehicleDefinitions {
  /**
   * Some types of bicycles.
   */
  bicycle_type: Texts;
  /**
   * Some types of fuel (e.g. `Gasoline`).
   */
  fuel: Texts;
  /**
   * Some brands of manufactures (e.g. `Tesla`).
   */
  manufacturer: Texts;
  /**
   * Some names of models (e.g. `Fiesta`).
   */
  model: Texts;
  /**
   * Some types of vehicles (e.g. `Minivan`).
   */
  type: Texts;
}

/**
 * Internal: A list of all keys for the VehicleDefinitions.
 */
export const vehicle = allOf<keyof VehicleDefinitions>()(
  'bicycle_type',
  'fuel',
  'manufacturer',
  'model',
  'type'
);
