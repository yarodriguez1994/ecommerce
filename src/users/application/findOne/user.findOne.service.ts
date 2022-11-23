import { Injectable,Inject } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { UserEntity } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';
import { User } from 'src/users/infrastructure/entities/user.entity';


@Injectable()
export class UserOne{ 
    constructor(@Inject('IUserRepository')
        private readonly userRepository:UserRepository
    ){}

    public async execute(id:string): Promise<UserEntity> {        
        const user = await this.userRepository.findOne(id);
        console.log(user);
        if (user === null) throw new Error(`User with id ${id} does exist`);
        return user;
    }

    public async findByEmail(email:string): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findByEmail(email);
        if (userByEmail === null) throw new Error(`User by email ${email} does exist`);
        return userByEmail;

    }
  
}