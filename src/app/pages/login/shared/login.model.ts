import { BaseResourceModel } from "../../../shared/models/base-resource.model"

export class Login extends BaseResourceModel {
    constructor(
     public id?: number,
     public userName?: string,
     public password?: string,
    ){
        super();
    }
}