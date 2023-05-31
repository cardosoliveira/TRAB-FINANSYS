import { BaseResourceModel } from "../../../shared/models/base-resource.model"

export class User extends BaseResourceModel {
    constructor(
     public id?: number,
     public userName?: string,
     public password?: string,
     public fullName?: string,
     public email?: string
    ){
        super();
    }
}