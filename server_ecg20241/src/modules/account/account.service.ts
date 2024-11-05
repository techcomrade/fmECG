import { AccountModel } from '../../entities/account.model';
import { AccountRepository } from './account.repository';
import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AccountServiceInterface } from './interfaces/account.service.interface';
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class AccountService implements AccountServiceInterface {
    constructor(
        private accountRepository: AccountRepository
    ) { }

    async findAll(): Promise<AccountModel[]> {
        try {
            return this.accountRepository.findAll();
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    async add(account: AccountModel): Promise<any> {
        const existingData = 0;
        if (existingData) {
            throw new ConflictException('Email already in use');
        }
        else {
            try {
                account.id = uuidv4();
                return await this.accountRepository.add(account);
            }
            catch (error) {
                console.log("Account.service.add failed", error);
                return false;
            }
        }
    }

    async findByEmail(email: string): Promise<AccountModel> {
        return await this.accountRepository.findByEmail(email);
    }

    async deleteByEmail(email: string): Promise<any> {
        let account = await this.findByEmail(email);
        if (!account) {
            throw new NotFoundException('Email not found');
        }
        try {
            return this.accountRepository.delete(email);
        }
        catch (error) {
            console.log("Account.service.delete failed", error);
            return false;
        }
    }
}