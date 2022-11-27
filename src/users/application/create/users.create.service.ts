import { Injectable,Inject } from '@nestjs/common';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { CreateUserInput } from '../../infrastructure/dto/inputs/create-user.input';
import { EventBus } from 'src/shared/domain/event.bus';
import { UserCreatedDomainEvent } from 'src/users/domain/user.created.domainEvent';
import { DomainEvent } from 'src/shared/domain/domain.event';
import { User } from 'src/users/infrastructure/entities/user.entity';


@Injectable()
export class UsersService {

  constructor(
    @Inject('IUserRepository') private readonly userRepository: UserRepository,
    @Inject('ICreateEvent') private readonly userEventBus:EventBus
  ) {}
  
  async execute(createUserInput: CreateUserInput): Promise<UserEntity>{

    const createUser:UserEntity = UserEntity.create(
      createUserInput.firstname,
      createUserInput.lastname,
      createUserInput.email,
      createUserInput.password,
      createUserInput.gender,
    );
    await this.userRepository.save(createUser);

    const newUserEvent = new UserCreatedDomainEvent(createUser);
    this.userEventBus.publish([newUserEvent]);

    return createUser;
  }

}
