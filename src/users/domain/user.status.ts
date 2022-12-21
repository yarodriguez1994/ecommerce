export class UserStatus {

    private status: string;

    constructor(status:string){
        this.status = status;
    }

    public static create(status:string): UserStatus {
	    return new UserStatus(status);
    }

    public getValue():string{
        return this.status;
    }

    public toInactive(){
        return this.status = 'Inactive';
    }

    public toActive(){
        return this.status = 'Active';
    }
}

