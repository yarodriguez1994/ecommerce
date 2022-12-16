import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';
import { UserUUID } from 'src/users/domain/user.uuid';


@Injectable()
export class  DeleteUserService{

    constructor(@Inject('IUserRepository')
                private readonly userRepository:UserRepository,
                @Inject('PUB_SUB') private readonly pubSub,

                ){}

    public async execute(id:string): Promise<any>{
        
        const userId = UserUUID.create(id);
        const findUser:UserEntity = await this.userRepository.findOne(userId);
        if (findUser === null) throw new Error(`User with id ${id} does exist`);
        findUser.delete()
        await this.userRepository.delete(userId);
        this.pubSub.publish('UserDeleted', {UserDeleted:{...findUser}});
        
        return  findUser.toResponse();
       
    }
    
}


