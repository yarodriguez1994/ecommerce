import {v4 as uuidv4} from 'uuid';

export interface UserPrimitives {
    id:string;
    uuid:string;
    email:string;
    gender:string;
    firstname:string;
    lastname:string;
    password:string;
}


export class UserEntity {

    readonly uuid: uuidv4;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly gender: string;

    private constructor(firstName: string, lastName: string, email: string, password: string, gender: string, id?:uuidv4 ){

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
            uuid:this.uuid,
            email: this.email,
            gender: this.gender,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password,
        }

    }

    // public static objectUser(attributes):UserPrimitives {

    //     return {
    //         id: attributes.id ,
    //         email: attributes.email,
    //         gender: attributes.gender,
    //         firstname: attributes.firstname,
    //         lastname: attributes.lastname,
    //     }

    // }


}