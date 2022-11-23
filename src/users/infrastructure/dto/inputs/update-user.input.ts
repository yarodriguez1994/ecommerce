import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber ,IsString, MaxLength, IsNotEmpty, IsEmail, MinLength, IsOptional} from 'class-validator';


@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
  @Field( () => String)
  @IsString()
  id:string
  
}
