import { Injectable,Inject } from '@nestjs/common';
import { UserEntity, UserPrimitives } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';

@Injectable()
export class UsersAll {

    constructor(@Inject('IUserRepository')
        private readonly userRepository:UserRepository
    ){}

    public async execute(): Promise<UserPrimitives[]> {        
        const allUSersEntity =  await this.userRepository.findAll();
        const usersResponse = allUSersEntity.map((user) => user.toPrimitives());
        return usersResponse;

    }

}