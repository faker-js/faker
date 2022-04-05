import { allOf } from './utils';

/**
 * The possible definitions related to vehicles.
 */
export interface VehicleDefinitions {
  /**
   * Some types of bicycles.
   */
  bicycle_type: string[];
  /**
   * Some types of fuel (e.g. `Gasoline`).
   */
  fuel: string[];
  /**
   * Some brands of manufactures (e.g. `Tesla`).
   */
  manufacturer: string[];
  /**
   * Some names of models (e.g. `Fiesta`).
   */
  model: string[];
  /**
   * Some types of vehicles (e.g. `Minivan`).
   */
  type: string[];
}

/**
 * Internal: A list of all keys for the VehicleDefinitions.
 */
export const VEHICLE = allOf<keyof VehicleDefinitions>()(
  'bicycle_type',
  'fuel',
  'manufacturer',
  'model',
  'type'
);
