export class UserLastName {

    private lastname: string;

    constructor(lastname:string){
        this.lastname = lastname;
    }

    public static create(lastname:string): UserLastName {
	    return new UserLastName(lastname);
    }

    public getValue(){
        return this.lastname;
    }
}
