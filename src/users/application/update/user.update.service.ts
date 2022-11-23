import { Injectable,Inject } from '@nestjs/common';
import { UpdateUserInput } from 'src/users/infrastructure/dto/inputs/update-user.input';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { CreateUserInput } from '../../infrastructure/dto/inputs/create-user.input';

@Injectable()
export class UserUpdateService{

    constructor(@Inject('IUserRepository')
        private readonly userRepository:UserRepository
    ){}

    public async execute(_id:string,updateUserInput:UpdateUserInput): Promise<any>{
        const updateUser = {
            id: updateUserInput.id,
            firstname: updateUserInput.firstname,
            lastname: updateUserInput.lastname,
            email: updateUserInput.email,
            password: updateUserInput.password,
            gender: updateUserInput.gender,
        }
        await this.userRepository.update(_id,updateUser);
        return updateUser;

    }


}