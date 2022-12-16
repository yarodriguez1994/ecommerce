import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {ApolloServerPluginLandingPageLocalDefault}   from 'apollo-server-core';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true
      },
      debug: false,
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault
      ],
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODBHOST,
      database: process.env.MONGODB_DATABASE,
      port:27017,
      entities: [ __dirname + '/**/*.entity{.ts,.js}',],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
