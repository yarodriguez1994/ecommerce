import { Injectable } from "@nestjs/common";
import { DomainEvent } from "src/shared/domain/domain.event";
import { UserEntity } from "../user.entity"

@Injectable()
export class UserDeletedDomainEvent  extends DomainEvent{
	static readonly EVENT_NAME = 'UserDeleted';
    readonly user: UserEntity;

	constructor(
        user: UserEntity,
        eventId?:string,
        occurredAt? :string,
    ){
        super( UserDeletedDomainEvent.EVENT_NAME,
                user.uuid.getValue(),
                occurredAt,
                eventId,
            )
        this.user = user;
	}
    
    toPrimitives(): object {
        const {aggregateId, eventId, user, occurredAt} = this;

        return {
            eventId,
            eventName:UserDeletedDomainEvent.EVENT_NAME,
            aggregateId,
            occurredAt:occurredAt,
            UserDeleted:user.toPrimitives(),
        }
    }

}


