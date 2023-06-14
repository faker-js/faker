import type { LocaleDefinition } from './definitions';
/**
 * A proxy for LocaleDefinition that marks all properties as required and throws an error when an entry is accessed that is not defined.
 */
export type LocaleProxy = Readonly<{
    [key in keyof LocaleDefinition]-?: LocaleProxyCategory<LocaleDefinition[key]>;
}>;
type LocaleProxyCategory<T> = Readonly<{
    [key in keyof T]-?: LocaleProxyEntry<T[key]>;
}>;
type LocaleProxyEntry<T> = unknown extends T ? T : Readonly<NonNullable<T>>;
/**
 * Creates a proxy for LocaleDefinition that throws an error if an undefined property is accessed.
 *
 * @param locale The locale definition to create the proxy for.
 */
export declare function createLocaleProxy(locale: LocaleDefinition): LocaleProxy;
export {};
