import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber ,IsString, MaxLength, IsNotEmpty, IsEmail, MinLength, IsOptional} from 'class-validator';

@InputType()
export class CreateUserInput {
    
  @Field(() => String)
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  firstname:string

  @Field(() => String,{nullable:true})
  @IsString()
  @MaxLength(10)
  @IsOptional()
  lastname?:string

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @Field(() => String )
  @IsNotEmpty()
  @MinLength(5)
  password:string;

  @Field( () => String)
  @IsNotEmpty()
  @MaxLength(1)
  gender:string;

  
}
