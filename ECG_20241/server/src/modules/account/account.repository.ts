import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountModel } from '../../entities/account.model';
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
                password: account.password
            })
        }
        catch (error){
            console.log("account.repository.add failed", error);
            return false;
        }
    }

    // async findByEmail(email: string): Promise<accountModel>{
    //     return await this.accountModel.findOne({ where: { email: email } });
    // }
}