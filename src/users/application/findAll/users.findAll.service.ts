import { Injectable,Inject } from '@nestjs/common';
import { UserEntity } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';

@Injectable()
export class UsersAll {

    constructor(@Inject('IUserRepository')
        private readonly userRepository:UserRepository
    ){}

    public async execute(): Promise<UserEntity[]> {        
        return await this.userRepository.findAll();
    }

}