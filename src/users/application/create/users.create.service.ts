import { Injectable,Inject } from '@nestjs/common';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { CreateUserInput } from '../../infrastructure/dto/inputs/create-user.input';
import { EventBus } from 'src/shared/domain/event.bus';
import { UserPassword } from '../../domain/user.password';
import { UserEMail } from 'src/users/domain/user.email';
import { UserName } from 'src/users/domain/user.name';
import { UserGender } from 'src/users/domain/user.gender';
import { UserUUID } from 'src/users/domain/user.uuid';
import { UserLastName } from 'src/users/domain/user.lastname';
import { UserStatus } from 'src/users/domain/user.status';


@Injectable()
export class UserCreateService {

  constructor(
    @Inject('IUserRepository') private readonly userRepository: UserRepository,
    @Inject('IEventBus') private readonly userEventBus:EventBus,
  ) {}
  
  async execute(createUserInput: CreateUserInput): Promise<Object>{

    const uuid = UserUUID.create(null);
    const firstName = UserName.create(createUserInput.firstname);
    const lastName = UserLastName.create(createUserInput.lastname);
    const password = UserPassword.create(createUserInput.password);
    const email = UserEMail.create(createUserInput.email);
    const gender = UserGender.create(createUserInput.gender);
    const status = UserStatus.create('Active');
    
    const prospUser = {
      uuid:uuid,
      firstname:firstName,
      lastname:lastName,
      password:password,
      email:email,
      gender:gender,
      status:status,
    }
    
    const createUser = UserEntity.create(prospUser);
    await this.userRepository.save(createUser);
    this.userEventBus.publish(createUser.pullDomainEvents());

    return createUser.toPrimitives();

  }

}
