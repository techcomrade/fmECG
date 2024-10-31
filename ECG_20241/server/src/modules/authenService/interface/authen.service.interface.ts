import { AccountRequest } from './../../account/dto/account.request';
import { AuthenRequest } from "../dto/authen.request";

export interface AuthenServiceInterface {
    login(authenRequest: AuthenRequest): Promise<any>;
    
    register(AccountRequest: AccountRequest): Promise<any>;
}