/**
 * An object with a lifecycle and an identity: two entities are the same entity when
 * their ids match, no matter how many of their other fields differ.
 */
export abstract class Entity<TId> {
  protected constructor(public readonly id: TId) {}

  public equals(other?: Entity<TId>): boolean {
    if (!other) return false;
    if (other === this) return true;
    return this.id === other.id;
  }
}
