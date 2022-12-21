import { Inject, Injectable } from '@nestjs/common';
import { exit } from 'process';
import { UserEntity } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';
import { UserUUID } from 'src/users/domain/user.uuid';
import { DomainError } from 'src/shared/domain/domain.error';
import { USerNotExist } from 'src/users/domain/user.notExist';
import { UserDeletedDomainEvent } from 'src/users/domain/domainEvents/user.deleted.domainEvent';
import { EventBus } from 'src/shared/domain/event.bus';


@Injectable()
export class  DeleteUserService{

    constructor(@Inject('IUserRepository')
                private readonly userRepository:UserRepository,
                @Inject('IEventBus') private readonly userEventBus:EventBus,

                ){}

    public async execute(id:string): Promise<object>{
        
        const userId = UserUUID.create(id);
        const findUser:UserEntity = await this.userRepository.findOne(userId);
        if (findUser === null) throw new USerNotExist(userId);
        findUser.delete();
        await this.userRepository.delete(findUser);
        //const userDeleteEvent = new UserDeletedDomainEvent(findUser);
        //console.log(userDeleteEvent);
        this.userEventBus.publish(findUser.pullDomainEvents());
        
        return  findUser.toPrimitives();
       
    }
    
}
