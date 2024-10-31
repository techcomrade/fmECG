import { AccountRequest } from "../../account/dto/account.request";
import { AuthenRequest } from "../dto/authen.request";

export interface AuthenServiceInterface {
    register(account: AccountRequest): Promise<any>;

    login(authenRequest: AuthenRequest): Promise<any>;
}