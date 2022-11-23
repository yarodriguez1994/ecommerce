import { ObjectId } from "mongoose"
import { UpdateUserInput } from "../infrastructure/dto/inputs/update-user.input"
import { UserEntity } from "./user.entity"

export interface UserRepository {
    save(newUser:UserEntity): Promise<UserEntity>
    findOne(id:string): Promise<UserEntity>
    findByEmail(email:string): Promise<UserEntity>
    findAll(): Promise<UserEntity[]>
    update(_id:string,updateUser:UpdateUserInput): Promise<void>
    findByEmail(email:string): Promise<UserEntity>
    delete(id:string): Promise<UserEntity>
}