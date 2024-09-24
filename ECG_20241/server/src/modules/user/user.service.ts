import { Injectable } from '@nestjs/common';
import { UserRepository } from './model/user.repository';
import { UserModel } from './model/user.model';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private accountService: AccountService
    ){}

    async add(user: UserModel) {
        try{
            await this.userRepository.add(user);
        }
        catch(error){
            console.log("account.service.add failed", error);
            return false;
        }
    }

    async findByEmail(email: string): Promise<UserModel>{
        try{
            const account = await this.accountService.findByEmail(email);
            return await this.userRepository.findByAccountId(account.id);
        }
        catch(error){
            console.log("account.service.findByEmail failed", error);
            return null;
        }
    }
}