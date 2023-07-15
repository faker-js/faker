/**
 * Bind all methods of a class to the class instance.
 *
 * @param that The class instance to bind the methods to.
 */
export function bindThisToMemberFunctions<
  TClass extends { new (...args: any[]): any }
>(that: InstanceType<TClass>): void {
  // Bind `this` so namespaced is working correctly
  for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(that))) {
    if (name === 'constructor' || typeof that[name] !== 'function') {
      continue;
    }

    that[name] = that[name].bind(that);
  }
}
