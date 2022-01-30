import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to commerce.
 */
export interface CommerceDefinitions {
  /**
   * Human readable color names
   */
  color: Texts;
  /**
   * Department names inside a shop.
   */
  department: Texts;
  /**
   * Product name generation definitions.
   */
  product_name: CommerceProductNameDefinitions;
  /**
   * Descriptions for products.
   */
  product_description: Texts;
}

/**
 * The possible definitions related to product name generation.
 */
export interface CommerceProductNameDefinitions {
  /**
   * Adjectives describing a product (e.g. tasty).
   */
  adjective: Texts;
  /**
   * Materials describing a product (e.g. wood).
   */
  material: Texts;
  /**
   * Types of products (e.g. chair).
   */
  product: Texts;
}

/**
 * Internal: A list of all keys for the CommerceDefinitions.
 */
export const commerce = allOf<keyof CommerceDefinitions>()(
  'color',
  'department',
  'product_name',
  'product_description'
);
