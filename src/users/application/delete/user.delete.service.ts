import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';
import { ObjectId, Schema } from 'mongoose';


@Injectable()
export class  DeleteUserService{

    constructor(@Inject('IUserRepository')
                private readonly userRepository:UserRepository
                ){}

    public async execute(id:string): Promise<any>{
        const findUser = await this.userRepository.findOne(id);
        if ( findUser === null ) throw new Error(`User by id ${id} does not exist`);
        await this.userRepository.delete(id);
        
        return {...findUser};
       
    }
    

}


