import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateService } from './application/create/users.create.service';
import { UsersAll } from './application/findAll/users.findAll.service';
import { UserOne } from './application/findOne/user.findOne.service';
import { User } from './infrastructure/entities/user.entity';
import { UserRepositoryMongo } from './infrastructure/persistence/user.repository-mongo';
import { UsersResolver } from './infrastructure/resolvers/users/users.resolver';
import { UserUpdateService } from './application/update/user.update.service';
import { DeleteUserService } from './application';
import { PubSub } from 'graphql-subscriptions';
import { UserEventBus } from './infrastructure/eventBus/user.pubSub.eventBus';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryMongo
    },
    {
      provide:'PUB_SUB',
      useValue: new PubSub(),
    },
    {
      provide :'ICreateEvent',
      useClass: UserEventBus,
    },
    UsersResolver,
    UserCreateService,
    UsersAll,
    UserOne,
    UserUpdateService,
    DeleteUserService,

  ]
})
export class UsersModule {}
