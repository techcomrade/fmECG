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
        try {
            return await this.accountModel.findAll();
        }
        catch (err) {
            console.log("account.repository.add failed", err);
            return null;
        }
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

    async findByEmail(email: string): Promise<AccountModel>{
        return await this.accountModel.findOne({ where: { email: email } });
    }

    async delete(email: string): Promise<any>{
        try {
            return await this.accountModel.destroy({ where: { email: email } });
        }
        catch (error){
            console.log("account.repository.delete failed", error);
            return false;
        }
    }
}