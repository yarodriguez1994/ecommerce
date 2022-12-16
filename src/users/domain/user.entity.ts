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

export class UserEntity {

    readonly uuid: UserUUID;
    readonly firstname: UserName;
    readonly lastname: UserLastName;
    readonly email: UserEMail;
    readonly password:UserPassword;
    readonly gender: UserGender;
    readonly status: UserStatus;


    private constructor(propsUSer:UserProps ){

        this.uuid = propsUSer.uuid;
        this.firstname = propsUSer.firstname
        this.lastname = propsUSer.lastname;
        this.email = propsUSer.email;
        this.password = propsUSer.password;
        this.gender = propsUSer.gender;
        this.status = propsUSer.status;
    }

    public static create(propsNewUser:UserProps):UserEntity{

        return new UserEntity(propsNewUser);
    }

    public toResponse():UserPrimitives {

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
        this.status 
    }

}