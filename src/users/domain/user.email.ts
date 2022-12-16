export class UserEMail {

    private email:string
    constructor (email:string){
        this.email = email;
    }

    private static isValidEmail(email:string): void{
        const regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

        if (!regex.test(email)){
            throw new Error("Email is invalid");
        }

    }

    public static create(email:string): UserEMail {
        this.isValidEmail(email);
        return new UserEMail(email);
    }

    public getValue(){
        return this.email;
    }

}