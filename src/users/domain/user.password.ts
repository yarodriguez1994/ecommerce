export class UserPassword {

    private password: string;

    constructor(password:string){

        this.password = password;
    }

    private static passwordIsValid(password: string): void {
        if ( password.length < 4){
            throw new Error("Password wrong. The password must be more 4 caracter ");
        }        
    }

    public static create(password:string): UserPassword {
	    this.passwordIsValid(password);
        return new UserPassword(password);
    }

    public getValue(){
        return this.password;
    }
}
