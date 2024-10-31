import { UserModel } from "../../../entities/user.model";
import { AccountRequest } from "../../account/dto/account.request";
import { AuthenRequest } from "../dto/authen.request";

export interface UserServiceInterface {
    login(authenRequest: AuthenRequest): Promise<any>;

    register(account: AccountRequest): Promise<any>;
}