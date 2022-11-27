import { DomainEvent } from './domain.event'

export interface EventBus {
	publish(domainEvents: DomainEvent[]): void
}