/**
 *
 * @param method
 */
export function Deprecated(method: string): any {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): any {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]): any {
      console.warn(
        `Deprecation Warning: faker.random.number is now located in ${method}'`
      );

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
