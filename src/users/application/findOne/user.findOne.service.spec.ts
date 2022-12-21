import { Test, TestingModule } from '@nestjs/testing';
import { Schema } from 'mongoose';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserOne } from './user.findOne.service';

describe('Find one user', () => {
  let service: UserOne;
  let repository: UserRepository;

    const objectUser = UserEntity.create(
        {'test user',
        'test apollo',
        'yilber@.comMM',
        '12345wdwdw6',
        "F",}
    )
    
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserOne,
        {
          provide: 'IUserRepository',
          useValue: {
             findOne: async (): Promise<UserEntity>  => {
              return await objectUser;
            },
          }
        },
      ],
    }).compile();

    service = module.get<UserOne>(UserOne);
    repository = module.get<UserRepository>('IUserRepository');
  });

  describe('Return user by id', () => {
      
    it('should be update user by id', async () => {

      const objectError = {
        "firstname" :"test user",
        "lastname": "test apollo",
        "email":"yilber@.comMM",
        "password":"12345wdwdw6",
        "gender":"M",
      }

      jest.spyOn(repository, 'findOne').getMockImplementation();
        
      const id = new Schema.Types.ObjectId('6373e8b1861eae41f03f9fe9');
      const user = await service.execute(id);
      expect(repository.findOne).toBeCalled();
      expect(objectError).toEqual(user);
   
    });
  });

});
