/**
 * Bind all methods of a class to the class instance.
 *
 * @param moduleClass The class to bind the methods of.
 * @param that The class instance to bind the methods to.
 */
export function bindToNamespace<TClass extends { new (...args: any[]): any }>(
  moduleClass: TClass,
  that: InstanceType<TClass>
): void {
  // Bind `this` so namespaced is working correctly
  for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(that)) as Array<
    keyof TClass | 'constructor'
  >) {
    if (name === 'constructor' || typeof that[name] !== 'function') {
      continue;
    }

    that[name] = that[name].bind(that);
  }
}
