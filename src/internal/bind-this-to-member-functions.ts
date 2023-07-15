/**
 * Bind all functions of the given instance to itself so you can use them independently.
 *
 * @internal
 *
 * @param instance The class instance of which the methods are to be bound to itself.
 *
 * @example
 * const someModule = new SomeModule(faker);
 * bindThisToMemberFunctions(someModule); // Usually called inside the constructor passing `this`
 * const someMethod = someModule.someMethod;
 * someMethod(); // Works
 */
export function bindThisToMemberFunctions<TClass extends { new (): TClass }>(
  instance: InstanceType<TClass>
): void {
  for (const name of Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance)
  )) {
    if (typeof instance[name] === 'function' && name !== 'constructor') {
      instance[name] = instance[name].bind(instance);
    }
  }
}
