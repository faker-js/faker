/**
 * An error instance that will be thrown by faker
 *
 * @internal
 */
export class FakerError extends Error {
  constructor(message: string) {
    super(message);
  }
}
