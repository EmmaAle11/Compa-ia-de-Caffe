/**
 * An object with no identity: it *is* its values. Two value objects with equal
 * properties are interchangeable. Immutable by construction.
 */
export abstract class ValueObject<TProps extends Record<string, unknown>> {
  protected constructor(protected readonly props: TProps) {
    Object.freeze(this.props);
  }

  public equals(other?: ValueObject<TProps>): boolean {
    if (!other) return false;
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
