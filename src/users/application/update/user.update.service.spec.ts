import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserUpdateService } from './user.update.service';

describe('Update user', () => {
  let service: UserUpdateService;
  let repository: UserRepository;

    const objectUser = { 
        id:"6373e8b1861eae41f03f9fe9",
        firstname: 'update user',
        lastname: 'update user',
        email: 'yilber@.com',
        password: '123456',
        gender: "M"
    }
    
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUpdateService,
        {
          provide: 'IUserRepository',
          useValue: {
            update () {
              return;
            },
          }
        },
      ],
    }).compile();

    service = module.get<UserUpdateService>(UserUpdateService);
    repository = module.get<UserRepository>('IUserRepository');
  });

  describe('Update user by id', () => {
      
    it('should be update user by id', async () => {

      const objectUpdate =  {
        id:"6373e8b1861eae41f03f9fe9",
        firstname :"update user",
        lastname: "update user",
        email:"yilber@.com",
        password:"123456",
        gender:"MM",
      }

      jest.spyOn(repository, 'update').getMockImplementation();
        
      const id = '6373e8b1861eae41f03f9fe9';
      const user = await service.execute(id,objectUpdate);
      expect(repository.update).toBeCalledWith(id,objectUpdate);
      expect(user).toStrictEqual(objectUser);
   
    });
  });

});
