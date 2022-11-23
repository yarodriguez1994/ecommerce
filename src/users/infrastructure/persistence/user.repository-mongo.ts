import { MongoRepository} from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from '../../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInput } from '../dto/inputs/update-user.input';

@Injectable()
export class UserRepositoryMongo implements UserRepository{

    constructor(
        @InjectRepository(User) private readonly mongoRepository:MongoRepository<UserEntity>
    ){}

    public async save(newUser:UserEntity): Promise<UserEntity>{
        return await this.mongoRepository.save(newUser);
    }
    public async update(_id:string,updateUser:UpdateUserInput): Promise<any>{
        return await this.mongoRepository.update(_id,updateUser);
    }

    public async findOne(id:string):Promise<UserEntity>{
         const user = await this.mongoRepository.findOneBy({uuid:id});
         return user;
    }

    public async findAll(): Promise<UserEntity[]> {
        return await this.mongoRepository.find();

    }

    public async findByEmail(email:string): Promise<any> {
        return await this.mongoRepository.findOneBy({email:email})
    }

    public async delete(id:string): Promise<any> {
        await this.mongoRepository.deleteOne({uuid:id});
    }

}