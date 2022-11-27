
export class DomainEvent {

	readonly name: string;
	readonly attributes: object;
	readonly occurredAt: string;

	constructor(
        kind: string, 
        attributes: object,
        occurredAt?: string,
    ){
        this.name = kind;
        this.attributes = attributes;
        this.occurredAt = occurredAt;
	}

}