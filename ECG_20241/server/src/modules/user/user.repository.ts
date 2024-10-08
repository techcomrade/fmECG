import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../entities/user.model';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(UserModel)
        private userModel: typeof UserModel
    ){}

    async findAll(): Promise<UserModel[]> {
        return await this.userModel.findAll();
    }

    async add(User: UserModel) {
        try {
            return await this.userModel.create({
                id: User.id,
                // email: User.email,
                // password: User.password,
                username: User.username,
                gender: User.gender,
                birth: User.birth,
                phone_number: User.phone_number,
                // status_id: 1,
                // information: User.information,
                // role_id: User.role_id,
            })
        }
        catch (error){
            console.log("User.repository.add failed", error);
            return false;
        }
    }

    // async findByEmail(email: string): Promise<UserModel>{
    //     return await this.userModel.findOne({ where: { email: email } });
    // }
}