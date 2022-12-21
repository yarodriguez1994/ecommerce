import { Resolver, Query, Mutation, Args, ID, Subscription} from '@nestjs/graphql'; 
import { UserCreateService } from '../../../application/create/users.create.service';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from '../../dto/inputs/create-user.input';
import { UpdateUserInput } from '../../dto/inputs/update-user.input';
import { UserEntity, UserPrimitives } from '../../../domain/user.entity';
import { UserUpdateService } from '../../../application/update/user.update.service'; 
import { HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { UsersAll, UserOne, DeleteUserService } from '../../../application/index';
import { UserUUID } from 'src/users/domain/user.uuid';


@Resolver(() => User)
export class UsersResolver {

  constructor(
    @Inject('PUB_SUB') private readonly pubSub,
    private readonly userCreateService: UserCreateService,
    private readonly usersAll: UsersAll,
    private readonly userOne: UserOne,
    private readonly userUpdateService: UserUpdateService,
    private readonly userDeleteService: DeleteUserService,
  ){}
  
  @Query( () => [User], { name: 'allUsers' } )
  async findAll(): Promise<UserPrimitives[]> {
    const users:UserPrimitives[] = await this.usersAll.execute();
    return users;
  }

  @Query( () => User, { name: 'findOne' } )
  async findOne(
    @Args('id',{type: () => String } ) id:string
  ): Promise<UserPrimitives>{
    const user:UserEntity = await this.userOne.execute(id);
    return user.toPrimitives();
  }

  // @Query( () => User, { name: 'findByEmail' } )
  // async findByEmail(
  //   @Args('email',{type: () => String } ) email:string
  // ): Promise<UserEntity>{
  //   const user = await this.userOne.findByEmail(email);
  //   return user;
  // }

  @Mutation( () => User, {name:'createUser'} )
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<Object>{
    return await this.userCreateService.execute(createUserInput);
  }
 
  @Mutation(() => User, {name:'updateUser'})
  async updateUser(
    @Args('id') _id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ):Promise<UserEntity> {
    return await this.userUpdateService.execute(_id,updateUserInput);
  }

  @Mutation(() => User, {name:'deleteUser'} )
  async removeUser(
    @Args('id', { type: () => String }) id: string
  ){
    return await this.userDeleteService.execute(id);
  }

  @Subscription((returns) => User ,{
    name:'UserAdded',
  }) 
  eventUserCreated(){
    return this.pubSub.asyncIterator('UserAdded');
  }

  @Subscription((returns) => User ,{
    name:'UserDeleted',
  }) 
  eventDeleteUser(){
    return this.pubSub.asyncIterator('UserDeleted');

  }

}

