import {v4 as uuidv4} from 'uuid';

export class GenerateUUID {

    private readonly uuid:uuidv4;

    constructor (uuid?:string){
        this.uuid  = uuid ? uuid : uuidv4();
    }

    public getValue(){
        return this.uuid;
    }

}