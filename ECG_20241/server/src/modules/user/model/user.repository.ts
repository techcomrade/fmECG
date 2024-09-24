import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(UserModel)
        private userModel: typeof UserModel
    ){}

    async findAll(): Promise<UserModel[]> {
        return await this.userModel.findAll();
    }

    async add(user: UserModel) {
        try {
            return await this.userModel.create({
                id: user.id,
                account_id: user.account_id,
                username: user.username,
                gender: user.gender,
                birth: user.birth,
                phone_number: user.phone_number,
                status: user.status,
                information: user.information,
                role: user.role,
            })
        }
        catch (error){
            console.log("user.repository.add failed", error);
            return false;
        }
    }

    async findByAccountId(account_id: string): Promise<UserModel>{
        return await this.userModel.findOne({ where: { account_id: account_id } });
    }
}