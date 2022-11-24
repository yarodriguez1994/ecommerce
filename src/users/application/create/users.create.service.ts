import { Injectable,Inject } from '@nestjs/common';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { CreateUserInput } from '../../infrastructure/dto/inputs/create-user.input';


@Injectable()
export class UsersService {

  constructor(
    @Inject('IUserRepository') private readonly userRepository: UserRepository,
    @Inject('PUB_SUB') private readonly pubSub,
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

    this.pubSub.publish('UserAdded', {UserAdded:createUser});

    return createUser;
  }

}
