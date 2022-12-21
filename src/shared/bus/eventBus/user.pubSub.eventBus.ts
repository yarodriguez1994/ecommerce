import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from "src/shared/domain/event.bus";
import { DomainEvent } from "src/shared/domain/domain.event";

@Injectable()
export class UserEventBus implements EventBus {

	constructor(
		@Inject('PUB_SUB') private readonly pubSub
	){}

	public async publish(domainEvents: DomainEvent[]) {

		//console.log(domainEvents);
		for(let domainEvent of domainEvents){

			const domainEventName = domainEvent.eventName;
			const domainEventAttributes = domainEvent.toPrimitives();
			await this.pubSub.publish(domainEventName,{...domainEventAttributes});
		}

	}

}