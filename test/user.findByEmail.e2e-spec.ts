import { Body, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"; 
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

jest.setTimeout(500000);

describe('Query return user by email', () => {

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

      describe('Query return user by email', ()=> {
               
        const queryEmailUser = () => `query FindByEmail($email: String!) {
            findByEmail(email: $email) {
              id
              firstname
              lastname
              email
              password
              gender
            }
          }`;
        
        it('Should return one user by id', async () => {
     
            return await request(app.getHttpServer())    
                .post('/graphql')
                .send({
                    operationName:'FindByEmail',
                    query: queryEmailUser(),
                    variables: {"email":"yarodriguez94@.gmailcom"}
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.findByEmail).toBeDefined()
                    expect(res.body.data.findByEmail.id).toBeDefined()
                })
        })

      });


});