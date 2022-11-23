import {v4 as uuidv4} from 'uuid';

export interface UserPrimitives {
    id:string;
    email:string;
    gender:string;
    firstname:string;
    lastname:string;
}


export class UserEntity {

    readonly uuid: uuidv4;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly gender: string;

    private constructor(id:uuidv4, firstName: string, lastName: string, email: string, password: string, gender: string ){

        this.uuid = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;
    }

    public static create(firstName: string, lastName: string, email: string, password: string, gender: string ){
        const uuid = uuidv4();
        return new UserEntity(uuid,firstName, lastName, email, password, gender);
    }

    public objectUser():UserPrimitives {

        return {
            id: this.uuid,
            email: this.firstname,
            gender: this.firstname,
            firstname: this.firstname,
            lastname: this.firstname,

        }

    }

}