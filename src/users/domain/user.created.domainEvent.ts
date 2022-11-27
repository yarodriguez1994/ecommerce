import { Inject, Injectable } from "@nestjs/common";
import { DomainEvent } from "src/shared/domain/domain.event";
import { UserEntity, UserPrimitives } from "./user.entity"
import { EventBus} from '../../../src/shared/domain/event.bus';

@Injectable()
export class UserCreatedDomainEvent  extends DomainEvent{
	static readonly EVENT_NAME = 'UserAdded';

    // private  readonly user;
	constructor(
        user: UserEntity,
        // user
    ){
        super(UserCreatedDomainEvent.EVENT_NAME ,user.objectUser())
	}

}