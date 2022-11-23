import { Body, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"; 
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

jest.setTimeout(500000);

describe('Mutacion create new user', () => {

    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
      });

      afterEach(async () => {
        await app.close();
      });  

               
      const mutationCreateUser = () => `mutation CreateUser($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
            id
            firstname
            lastname
            email
            password
            gender
          }
        }`;

        const variables = {

          "createUserInput": {
            "email": "testcreate@mail.com",
            "firstname": "testcreate",
            "gender": "testcreate",
            "lastname":"testcreate",
            "password": "123456"
          }
        }
          
        
      it('Should create a new user', async () => {
    
          return await request(app.getHttpServer())    
              .post('/graphql')
              .send({
                  operationName:'CreateUser',
                  query: mutationCreateUser(),
                  variables: variables
              })
              .expect(200)
              .expect((res) => {
                  expect(res.body.data.createUser.id).toBeDefined()
              })

      })

});