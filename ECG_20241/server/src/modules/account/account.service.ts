import { AccountModel } from './model/account.model';
import { AccountRepository } from './model/account.repository';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class AccountService {
    constructor(
        private accountRepository: AccountRepository
    ){}

    async findAll(): Promise<AccountModel[]> {
        return this.accountRepository.findAll();
    }

    async add(account: AccountModel) {
        const existingData  = await this.findByEmail(account.email);
        if (existingData) {
            throw new ConflictException('Email already in use');
        }
        else{
            try{
                await this.accountRepository.add(account);
            }
            catch(error){
                console.log("account.service.add failed", error);
                return false;
            }
        }
    }

    async findByEmail(email: string): Promise<AccountModel>{
            const account = await this.accountRepository.findByEmail(email);
            if(!account){
                return null;
            }
            else return account;
    }
}