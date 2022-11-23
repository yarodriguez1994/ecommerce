import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNumber ,IsString, MaxLength, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Entity, Column, ObjectIdColumn, PrimaryColumn, ObjectID} from 'typeorm';

@Entity({name:'users'})
@ObjectType()
export class User {

  @Field(() => String)
  @IsNumber()
  @ObjectIdColumn()
  id: ObjectID;


  @Field(() => String)
  @Column()
  uuid: string;

  @Field(() => String)
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  @Column()
  firstname:string

  @Field(() => String,{nullable:true})
  @IsString()
  @MaxLength(10)
  @Column()
  lastname:string

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  @Column()
  email:string;

  @Field(() => String )
  @IsNotEmpty()
  @MinLength(5)
  @Column()
  password:string;

  @Field( () => String)
  @IsNotEmpty()
  @MaxLength(1)
  @Column()
  gender:string;

}


