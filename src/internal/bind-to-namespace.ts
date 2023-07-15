// eslint-disable-next-line
export function bindToNamespace<TClass>(moduleClass: any, that: any): void {
  // Bind `this` so namespaced is working correctly
  for (const name of Object.getOwnPropertyNames(moduleClass.prototype) as Array<
    keyof TClass | 'constructor'
  >) {
    if (name === 'constructor' || typeof that[name] !== 'function') {
      continue;
    }

    that[name] = that[name].bind(that);
  }
}
