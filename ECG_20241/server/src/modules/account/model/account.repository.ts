import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountModel } from './account.model';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class AccountRepository {
    constructor(
        @InjectModel(AccountModel)
        private accountModel: typeof AccountModel
    ){}

    async findAll(): Promise<AccountModel[]> {
        return await this.accountModel.findAll();
    }

    async add(account: AccountModel) {
        try {
            return await this.accountModel.create({
                id: account.id,
                email: account.email,
                password: account.password,
                username: account.username,
                gender: account.gender,
                birth: account.birth,
                phone_number: account.phone_number,
                status: 1,
                information: account.information,
                role: account.role,
            })
        }
        catch (error){
            console.log("account.repository.add failed", error);
            return false;
        }
    }

    async findByEmail(email: string): Promise<AccountModel>{
        return await this.accountModel.findOne({ where: { email: email } });
    }
}