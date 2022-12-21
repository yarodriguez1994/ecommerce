import { DomainError } from "src/shared/domain/domain.error";
import { UserUUID } from "./user.uuid";

export class USerNotExist extends DomainError {

    constructor(id:UserUUID){
        super(`The user with id ${id.getValue()} does exist`);
    }


}