import { Resolver, Query, Mutation, Args, ID, Subscription} from '@nestjs/graphql'; 
import { UsersService } from '../../../application/create/users.create.service';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from '../../dto/inputs/create-user.input';
import { UpdateUserInput } from '../../dto/inputs/update-user.input';
import { UserEntity } from '../../../domain/user.entity';
import { UserUpdateService } from '../../../application/update/user.update.service'; 
import { HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { UsersAll, UserOne, DeleteUserService } from '../../../application/index';


@Resolver(() => User)
export class UsersResolver {
  
  // private pubSub = new PubSub();

  constructor(
    @Inject('PUB_SUB') private readonly pubService,
    private readonly usersService: UsersService,
    private readonly usersAll: UsersAll,
    private readonly userOne: UserOne,
    private readonly userUpdateService: UserUpdateService,
    private readonly userDeleteService: DeleteUserService,
  ){}
  
  @Query( () => [User], { name: 'allUsers' } )
  async findAll(): Promise<UserEntity[]> {
    return await this.usersAll.execute();
  }

  @Query( () => User, { name: 'findOne' } )
  async findOne(
    @Args('id',{type: () => String } ) id:string
  ): Promise<UserEntity>{
    const user = await this.userOne.execute(id);
    return user;
  }

  @Query( () => User, { name: 'findByEmail' } )
  async findByEmail(
    @Args('email',{type: () => String } ) email:string
  ): Promise<UserEntity>{
    const user = await this.userOne.findByEmail(email);
    return user;
  }

  @Mutation( () => User, {name:'createUser'} )
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<UserEntity>{
    return await this.usersService.execute(createUserInput);
    // this.pubSub.publish('UserAdded', { UserAdded:newUser });
    // this.pubService.publish('UserAdded', { UserAdded:newUser });
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
    filter : (payload) => payload,
  }) 
  eventUserCreated(){
    // return this.pubSub.asyncIterator('UserAdded');
    return this.pubService.asyncIterator('UserAdded');

  }

  @Subscription((returns) => User ,{
    name:'UserDeleted',
    filter : (payload) => payload,
  }) 
  eventDeleteUser(){
    // return this.pubSub.asyncIterator('UserAdded');
    return this.pubService.asyncIterator('UserDeleted');

  }

}
