import {Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({

    // providers:[
    //   {  
    //         provide:'DB_CONNECT',
    //         connectDb: async () => {
    //             const db = await TypeOrmModule.forRoot({
    //                 type: 'mongodb',
    //                 database: process.env.MONGODB_DATABASE,
    //                 host: process.env.MONGODBHOST,
    //                 entities: [ __dirname + '/**/*.entity{.ts,.js}',],
    //                 synchronize: true,
    //                 useUnifiedTopology: true,
    //                 useNewUrlParser: true
    //             })
                
    //         }
    //     }
    // ]

})
export class MongoModule {

 }
