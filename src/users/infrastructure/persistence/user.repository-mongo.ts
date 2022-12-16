import { MongoRepository} from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity, UserPrimitives } from '../../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInput } from '../dto/inputs/update-user.input';
import { UserUUID } from 'src/users/domain/user.uuid';

@Injectable()
export class UserRepositoryMongo implements UserRepository{

    constructor(
        @InjectRepository(User) private readonly mongoRepository:MongoRepository<UserEntity>
    ){}

    public async save(newUser:UserEntity): Promise<void>{
        const objectNewUser:object = newUser.toResponse()
        await this.mongoRepository.save(objectNewUser);
    }
    public async update(_id:string,updateUser:UpdateUserInput): Promise<any>{
        // return await this.mongoRepository.update(_id,updateUser);
    }

    public async findOne(id:UserUUID):Promise<UserEntity>{
        const user:any = await this.mongoRepository.findOneBy({uuid:id.getValue()});
        return UserEntity.fromPrimitives(user);
    }

    public async findAll(): Promise<UserEntity[]> {
        const allUsers:any = await this.mongoRepository.find();
        const allEntityUsers = allUsers.map( (user)  => UserEntity.fromPrimitives(user));
        return allEntityUsers;

    }

    public async findByEmail(email:string): Promise<any> {
        return await this.mongoRepository.findOneBy({email:email})
    }

    public async delete(id:UserUUID): Promise<any> {
        const userInactive = await this.mongoRepository.updateOne({uuid:id.getValue()},{$set :{status:'Inactive'}});
        // console.log(userInactive);
    }

}