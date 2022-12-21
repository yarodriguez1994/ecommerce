import { userInfo } from 'os';
import { AggregateRoot } from 'src/shared/domain/Aggregate/aggregate.root';
import { UserCreatedDomainEvent } from './domainEvents/user.created.domainEvent';
import { UserDeletedDomainEvent } from './domainEvents/user.deleted.domainEvent';
import { UserEMail } from './user.email';
import { UserGender } from './user.gender';
import { UserLastName } from './user.lastname';
import { UserName } from './user.name';
import { UserPassword } from './user.password';
import { UserStatus } from './user.status';
import { UserUUID } from './user.uuid';

export interface UserProps  {
    uuid:UserUUID;
    email:UserEMail;
    gender:UserGender;
    firstname:UserName;
    lastname:UserLastName;
    password:UserPassword;
    status:UserStatus;
}

export interface UserPrimitives {
    uuid:string;
    email:string;
    gender:string;
    firstname:string;
    lastname:string;
    password:string;
    status:string;
}

export class UserEntity extends AggregateRoot{

    readonly uuid: UserUUID;
    readonly firstname: UserName;
    readonly lastname: UserLastName;
    readonly email: UserEMail;
    readonly password:UserPassword;
    readonly gender: UserGender;
    readonly status: UserStatus;


    private constructor(propsUSer:UserProps ){
        super();
        this.uuid = propsUSer.uuid;
        this.firstname = propsUSer.firstname
        this.lastname = propsUSer.lastname;
        this.email = propsUSer.email;
        this.password = propsUSer.password;
        this.gender = propsUSer.gender;
        this.status = propsUSer.status;
    }

    public static create(propsNewUser:UserProps):UserEntity{
        const user = new UserEntity(propsNewUser);
        user.record( new UserCreatedDomainEvent(user));
        return user;
    }

    public toPrimitives():UserPrimitives {

        return { 
            uuid:this.uuid.getValue(),
            email: this.email.getValue(),
            gender: this.gender.getValue(),
            firstname: this.firstname.getValue(),
            lastname: this.lastname.getValue(),
            password: this.password.getValue(),
            status: this.status.getValue(),
        }

    }

    public static fromPrimitives(propsUser:UserPrimitives):UserEntity{

        const uuid = UserUUID.create(propsUser.uuid);
        const firstName = UserName.create(propsUser.firstname);
        const lastName = UserLastName.create(propsUser.lastname);
        const email = UserEMail.create(propsUser.email);
        const password = UserPassword.create(propsUser.password);
        const gender = UserGender.create(propsUser.gender);
        const status = UserStatus.create(propsUser.status);


        return new UserEntity ({
            uuid:uuid,
            firstname:firstName,
            lastname:lastName,
            email:email,
            password:password,
            gender:gender,
            status:status,
        })

    }

    public delete():void {
      
        this.status.toInactive();
        this.record(new UserDeletedDomainEvent(this));
    }

}