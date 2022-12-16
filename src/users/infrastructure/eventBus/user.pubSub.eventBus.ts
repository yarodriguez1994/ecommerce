import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from "src/shared/domain/event.bus";
import { DomainEvent } from "src/shared/domain/domain.event";

@Injectable()
export class UserEventBus implements EventBus {

	constructor(
		@Inject('PUB_SUB') private readonly pubSub
	){}

	public async publish(domainEvents: DomainEvent[]) {

		for(let domainEvent of domainEvents){

			const domainEventName = domainEvent.name;
			const domainEventAttributes = domainEvent.attributes;
			await this.pubSub.publish(domainEventName, {domainEventName:domainEventAttributes});
		}

	}

}