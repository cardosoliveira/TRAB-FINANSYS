import { BaseResourceModel } from "../../../shared/models/base-resource.model"

export class Login extends BaseResourceModel {
    constructor(
     public id?: number,
     public email?: string,
     public password?: string,
    ){
        super();
    }
}