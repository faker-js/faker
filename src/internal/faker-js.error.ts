/**
 * @internal
 */
export class FakerError extends Error {
  constructor(message: string) {
    super('[@faker-js/faker]: ' + message);
  }
}
