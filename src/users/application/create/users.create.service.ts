import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from '../../dto/inputs/create-user.input';
import { UpdateUserInput } from '../../dto/inputs/update-user.input';

@Injectable()
export class UsersService {

  private user : User[] =[ 
    {
      id:1,
      firstname:'Yilber',
      lastname:'Rodriguez',
      email:'yilber@kunturtech.com',
      password:'12345',
      gender:'M'
      
    }
  ]
  
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
