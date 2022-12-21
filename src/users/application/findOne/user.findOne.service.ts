import { Injectable,Inject } from '@nestjs/common';
import { UserEntity } from 'src/users/domain/user.entity';
import { USerNotExist } from 'src/users/domain/user.notExist';
import { UserRepository } from 'src/users/domain/user.repository';
import { UserUUID } from 'src/users/domain/user.uuid';


@Injectable()
export class UserOne{ 
    constructor(@Inject('IUserRepository')
        private readonly userRepository:UserRepository
    ){}

    public async execute(id:string): Promise<UserEntity> {  
        const userId = UserUUID.create(id);
        const user = await this.userRepository.findOne(userId);
        if (user === null) throw new USerNotExist(userId);
        return user;
    }

    // public async findByEmail(email:string): Promise<UserEntity> {
    //     const userByEmail = await this.userRepository.findByEmail(email);
    //     if (userByEmail === null) throw new Error(`User by email ${email} does exist`);
    //     return userByEmail;

    // }
  
}