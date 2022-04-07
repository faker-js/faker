import { allOf } from './utils';

/**
 * The possible definitions related to commerce.
 */
export interface CommerceDefinitions {
  /**
   * Department names inside a shop.
   */
  department: string[];
  /**
   * Product name generation definitions.
   */
  product_name: CommerceProductNameDefinitions;
  /**
   * Descriptions for products.
   */
  product_description: string[];
}

/**
 * The possible definitions related to product name generation.
 */
export interface CommerceProductNameDefinitions {
  /**
   * Adjectives describing a product (e.g. tasty).
   */
  adjective: string[];
  /**
   * Materials describing a product (e.g. wood).
   */
  material: string[];
  /**
   * Types of products (e.g. chair).
   */
  product: string[];
}

/**
 * Internal: A list of all keys for the CommerceDefinitions.
 */
export const COMMERCE = allOf<keyof CommerceDefinitions>()(
  'department',
  'product_name',
  'product_description'
);
