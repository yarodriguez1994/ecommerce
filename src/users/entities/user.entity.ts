import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNumber ,IsString, MaxLength, IsNotEmpty, IsEmail, MinLength} from 'class-validator';
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@ObjectType()
@Entity()
export class User {

  @Field(() => String)
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  firstname:string

  @Field(() => String,{nullable:true})
  @IsString()
  @MaxLength(10)
  lastname:string

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


