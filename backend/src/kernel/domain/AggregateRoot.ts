import { DomainEvent } from './DomainEvent';
import { Entity } from './Entity';

/**
 * The only entity in a consistency boundary that the outside world may hold a
 * reference to. Everything inside the boundary is reached through it, so the
 * aggregate is the one place its invariants can be enforced.
 *
 * Events are collected, never published from inside the domain: the application layer
 * pulls them with `pullDomainEvents()` once persistence has succeeded, so a rolled-back
 * transaction cannot leak an event that never really happened.
 */
export abstract class AggregateRoot<TId> extends Entity<TId> {
  private domainEvents: DomainEvent[] = [];

  protected record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = this.domainEvents;
    this.domainEvents = [];
    return events;
  }
}
