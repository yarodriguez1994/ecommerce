import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../domain/user.entity';
import { UsersService } from './users.create.service';
import { UserRepositoryMongo } from '../../infrastructure/persistence/user.repository-mongo';
import { UserRepository } from '../../domain/user.repository';

describe('User', () => {
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'IUserRepository',
          useValue: {
            save: () => {
              return;
            },
            findByEmail: () => {
              return;
            }
          }
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>('IUserRepository');
  });

  it('should be save', async () => {

    const objectUser = { 
      firstname: "example", 
      lastname: "example last name", 
      email: "test@email.com", 
      password: "12345", 
      gender: "f" 
    }

    jest.spyOn(repository, 'save').getMockImplementation();

    const newUser = await service.execute(objectUser)

    expect(repository.save).toBeCalledWith(objectUser);
    expect(newUser).toBeInstanceOf(UserEntity);
  });


  it('should be error for email already exist', () => {
    const object = { 
      firstname: "example", 
      lastname: "example last name", 
      email: "test@email.com", 
      password: "12345", 
      gender: "f" 
    }


    });

});
