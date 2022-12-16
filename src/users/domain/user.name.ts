export class UserName {

    private firstname: string;

    constructor(firstname:string){
        this.firstname = firstname;
    }

    public static create(firstname:string): UserName {
	    return new UserName(firstname);
    }

    public getValue():string{
        return this.firstname;
    }
}
