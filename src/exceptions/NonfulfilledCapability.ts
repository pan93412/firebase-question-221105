/**
 * This Discord client does not include the required capabilities.
 */
export class NonfulfilledCapability extends Error {
  /**
   * Construct a `NonfulfilledCapability`.
   */
  constructor() {
    super("This Discord client does not include the required capabilities.");
    this.name = NonfulfilledCapability.name;
  }
}
