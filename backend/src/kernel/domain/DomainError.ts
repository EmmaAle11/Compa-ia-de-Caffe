/**
 * A broken business rule — not a bug, not an infrastructure failure.
 * Adapters translate this into their own protocol (HTTP 400/422, a queue nack, …);
 * the domain itself stays ignorant of how it will be reported.
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

/** An invariant that must hold for the aggregate to exist at all. */
export class InvariantViolationError extends DomainError {}
