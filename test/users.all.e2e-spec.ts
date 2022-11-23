import { Body, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"; 
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

jest.setTimeout(500000);

describe('Query Resolver allUsers', () => {

    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
      });


      describe('Query return all user', ()=> {
               
        const queryAllUsers = () => `
        query Query {
            allUsers {
              id
              firstname
              lastname
              email
              password
              gender
            }
          }` ;
        
        it('Should return an object with list users', async () => {

            const  bodySample = {
             
                "id": "6373d3c0f6b3ca3654761e2e",
                "firstname": "test user",
                "lastname": "test apollo",
                "email": "yilber@.com",
                "password": "123456",
                "gender": "M"
            }
           
           
            const  { body } = await request(app.getHttpServer())    
                .post('/graphql')
                .send({
                    query: queryAllUsers(),
                })
                .expect(200)
    
            expect(typeof body.data.allUsers[0]).toEqual(typeof bodySample);
            expect(body.data.allUsers[0]).toStrictEqual(bodySample);
        })

      });


});