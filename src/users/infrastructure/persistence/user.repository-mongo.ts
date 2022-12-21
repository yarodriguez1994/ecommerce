import { MongoRepository} from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity, UserPrimitives } from '../../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInput } from '../dto/inputs/update-user.input';
import { UserUUID } from 'src/users/domain/user.uuid';
import { exit } from 'process';

@Injectable()
export class UserRepositoryMongo implements UserRepository{

    constructor(
        @InjectRepository(User) private readonly mongoRepository:MongoRepository<UserEntity>
    ){}

    public async save(newUser:UserEntity): Promise<void>{
        const objectNewUser:object = newUser.toPrimitives()
        await this.mongoRepository.save(objectNewUser);
    }
    public async update(_id:string,updateUser:UpdateUserInput): Promise<any>{
        // return await this.mongoRepository.update(_id,updateUser);
    }

    public async findOne(id:UserUUID):Promise<UserEntity>{
        const user:any = await this.mongoRepository.findOneBy({uuid:id.getValue()});
        return  user !== null 
        ? UserEntity.fromPrimitives(user)
        : null
    }

    public async findAll(): Promise<UserEntity[]> {
        const allUsers:any = await this.mongoRepository.find();
        const allEntityUsers = allUsers.map( (user)  => UserEntity.fromPrimitives(user));
        return allEntityUsers;
    }

    public async findByEmail(email:string): Promise<any> {
        return await this.mongoRepository.findOneBy({email:email})
    }

    public async delete(updateUser:UserEntity): Promise<void> {
        const newUserStatus:UserPrimitives = updateUser.toPrimitives();
        const idUser:string = newUserStatus.uuid;
        const newStatus:string = newUserStatus.status;
        await this.mongoRepository.updateOne({uuid:idUser},{$set :{status:newStatus}});
    }

}