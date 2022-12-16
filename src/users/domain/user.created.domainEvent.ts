import { Inject, Injectable } from "@nestjs/common";
import { DomainEvent } from "src/shared/domain/domain.event";
import { UserEntity } from "./user.entity"

@Injectable()
export class UserCreatedDomainEvent  extends DomainEvent{
	static readonly EVENT_NAME = 'UserAdded';

	constructor(
        user: UserEntity,
    ){
        super(UserCreatedDomainEvent.EVENT_NAME ,user.toResponse())
	}

}