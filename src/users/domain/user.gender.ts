export class UserGender {

    private gender:string
    constructor (gender:string){
        this.gender = gender;
    }

    public static create(gender:string): UserGender {
        return new UserGender(gender);
    }

    public getValue(){
        return this.gender;
    }

}