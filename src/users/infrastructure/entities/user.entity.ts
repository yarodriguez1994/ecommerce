import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNumber ,IsString, MaxLength, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { UserEMail } from 'src/users/domain/user.email';
import { UserGender } from 'src/users/domain/user.gender';
import { UserLastName } from 'src/users/domain/user.lastname';
import { UserName } from 'src/users/domain/user.name';
import { UserPassword } from 'src/users/domain/user.password';
import { UserUUID } from 'src/users/domain/user.uuid';
import { Entity, Column, ObjectIdColumn, PrimaryColumn, ObjectID} from 'typeorm';

@Entity({name:'users'})
@ObjectType()
export class User {

  @Field(() => String,{nullable:true})
  @IsNumber()
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String)
  @PrimaryColumn()
  @Column()
  uuid: string;

  @Field(() => String)
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  @Column({
    transformer: {
      to(firstname:UserName) {
        // Transform 'invoiceNumber'
        return firstname.getValue();
      },
    from(firstname:UserName) {
      // Do nothing
      return firstname.getValue();
    }

  }})
  firstname:UserName

  @Field(() => String,{nullable:true})
  @IsString()
  @MaxLength(10)
  @Column({
    transformer: {
      to(value:UserLastName) {
        // Transform 'invoiceNumber'
        return value.getValue();
      },
    from(value:UserLastName) {
      // Do nothing
      return value;
    }

  }})
  lastname:string

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  @Column({
    transformer: {
      to(value:UserEMail) {
        // Transform 'invoiceNumber'
        return value.getValue();
      },
    from(value:UserEMail) {
      // Do nothing
      return value;
    }

  }})
  email:string;

  @Field(() => String )
  @IsNotEmpty()
  @MinLength(5)
  @Column({
    transformer: {
      to(value:UserPassword) {
        // Transform 'invoiceNumber'
        return value.getValue();
      },
    from(value:UserPassword) {
      // Do nothing
      return value;
    }

  }})
  password:string;
  
  @Field( () => String)
  @IsNotEmpty()
  @MaxLength(1)
  @Column({
    transformer: {
      to(value:UserGender) {
        // Transform 'invoiceNumber'
        return value.getValue();
      },
    from(value:UserGender) {
      // Do nothing
      return value;
    }

  }})
  gender:string;

  @Field( () => String)
  @IsNotEmpty()
  @Column()
  status:string;

}


