import { GenerateUUID } from 'src/shared/domain/uuid.generate';


export class UserUUID extends GenerateUUID{

    private constructor(uuid:string){
        super(uuid);
    }

    public static create (uuid:string):UserUUID {
        return new UserUUID(uuid);
    }

    
}