import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UsersAll } from './users.findAll.service';


describe('AllUsers', () => {
  let service: UsersAll;
  let repository: UserRepository;

  const object = [ 
    UserEntity.create(
      "example", 
      "example last name", 
      "test@email.com", 
      "12345", 
      "f" 
   ) ,
   UserEntity.create(
    "example 2", 
    "example last name 2", 
    "test2@email.com", 
    "123453456", 
    "m" 
 ) ,
]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersAll,
        {
          provide: 'IUserRepository',
          useValue: {
            findAll: async (): Promise<UserEntity[]> => {
              return object;
            },
          }
        },
      ],
    }).compile();

    service = module.get<UsersAll>(UsersAll);
    repository = module.get<UserRepository>('IUserRepository');
  });

  describe('AllUsers', () => {
      
    it('should be array of all users', async () => {
      jest.spyOn(repository, 'findAll').getMockImplementation();
        
      const users = await service.execute();
      expect(repository.findAll).toHaveBeenCalled();
      expect(users.length).toBe(object.length);
      users.forEach(user => {
        expect(user).toBeInstanceOf(UserEntity);
      });
    });
  });

});
