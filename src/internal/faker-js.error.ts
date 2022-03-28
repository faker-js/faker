/**
 * @internal
 */
export class FakerJsError extends Error {
  constructor(message: string) {
    super('[@faker-js/faker]: ' + message);
  }
}
