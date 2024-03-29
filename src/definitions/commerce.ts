import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to commerce.
 */
export type CommerceDefinition = LocaleEntry<{
  /**
   * Department names inside a shop.
   */
  department: string[];

  /**
   * Product name generation definitions.
   */
  product_name: CommerceProductNameDefinition;

  /**
   * Descriptions for products.
   */
  product_description: string[];
}>;

/**
 * The possible definitions related to product name generation.
 */
export interface CommerceProductNameDefinition {
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
