import { GenerateUUID } from './uuid.generate';

export abstract class DomainEvent {

    static EVENT_NAME: string;
    readonly eventName: string;
	abstract toPrimitives(): object;
	readonly occurredAt: string;
    readonly aggregateId : string;
    readonly eventId: string;

	constructor(
        eventName: string, 
        aggregateId: string,
        occurredAt?: string,
        eventId?: string
    ){
        this.eventName = eventName;
        this.aggregateId = aggregateId
        this.eventId = eventId ? eventId : new GenerateUUID().getValue();
        this.occurredAt = occurredAt ? occurredAt : new Date().toString();
	}

}