import { UpdateUserInput } from "../infrastructure/dto/inputs/update-user.input"
import { UserEntity } from "./user.entity"
import { UserUUID } from "./user.uuid"

export interface UserRepository {
    save(newUser:UserEntity): Promise<void>
    findOne(id:UserUUID): Promise<UserEntity>
    findByEmail(email:string): Promise<UserEntity>
    findAll(): Promise<UserEntity[]>
    update(_id:string,updateUser:UpdateUserInput): Promise<void>
    findByEmail(email:string): Promise<UserEntity>
    delete(id:UserUUID): Promise<void>
}