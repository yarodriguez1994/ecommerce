import { Module } from '@nestjs/common';
import { UsersService } from './application/create/users.create.service';
import { UsersResolver } from './infrastructure/resolvers/users/users.resolver';

@Module({
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
