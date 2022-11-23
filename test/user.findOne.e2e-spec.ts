import {INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"; 
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { UsersService }  from '../src/users/application/create/users.create.service';
import { DeleteUserService }  from '../src/users/application/delete/user.delete.service';
import { UserOne } from '../src/users/application/findOne/user.findOne.service';
import { UserRepositoryMongo } from "src/users/infrastructure/persistence/user.repository-mongo";
import { UserRepository } from 'src/users/domain/user.repository';


jest.setTimeout(500000);

describe('Query return user by id', () => {

    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
          providers :[
            {
              provide: 'IUserRepository',
              useClass: UserRepositoryMongo
            },
          ]
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
      });

      describe('Query return user by id', ()=> {

        it('Should return one user by id', async () => {

          const IUserRepository = app.get<'IUserRepository'>('UserRepository');

          const userService = app.get<UsersService>(UsersService);
          // const userService = IUserRepository.save;

          const objectNewUser = {
              email: "testcreate@mail.com",
              firstname: "testcreate",
              gender: "testcreate",
              lastname:"testcreate",
              password: "123456"
          }
        
          const userCreated = await userService.execute(objectNewUser);
          const uuidCreated =  userCreated.uuid;
                   
          const queryOneUser = () => `query FindOne($findOneId: String!) {
                findOne(id: $findOneId) {
                  id
                  uuid
                  gender
                  firstname
                  email
                }
            }`;

          const {body} = await request(app.getHttpServer())    
                .post('/graphql')
                .send({
                    operationName:'FindOne',
                    query: queryOneUser(),
                    variables: {
                        "findOneId" : uuidCreated,
                    }
                    
                    
                })
                .expect(200)
                
                expect(body.data.findOne.id).toBeDefined();
                expect(body.data.findOne.uuid).toBeDefined();
                expect(body.data.findOne.uuid).toStrictEqual(uuidCreated);

          const deleteUserService = app.get<DeleteUserService>(DeleteUserService);

           await deleteUserService.execute(body.data.findOne.uuid);

           const findOne =  app.get<UserOne>(UserOne);

           const removeUser = await findOne.execute(uuidCreated);

            expect(removeUser).toBeUndefined();


        })

      });


});