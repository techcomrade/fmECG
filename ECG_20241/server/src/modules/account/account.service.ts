import { AccountModel } from '../../entities/account.model';
import { AccountRepository } from './account.repository';
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AccountService {
    constructor(
        private accountRepository: AccountRepository
    ) { }

    async findAll(): Promise<AccountModel[]> {
        return this.accountRepository.findAll();
    }

    async add(Account: AccountModel): Promise<Boolean> {
        const existingData = 0;
        if (existingData) {
            throw new ConflictException('Email already in use');
        }
        else {
            try {
                await this.accountRepository.add(Account);
            }
            catch (error) {
                console.log("Account.service.add failed", error);
                return false;
            }
        }
    }

    // async findByEmail(email: string): Promise<AccountModel | any> {
    //     return await this.AccountRepository.findByEmail(email);
    // }
}