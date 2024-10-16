import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../entities/user.model';
import { UserRequest } from './dto/user.request';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(UserModel)
        private userModel: typeof UserModel
    ) { }

    async findAll(): Promise<UserModel[]> {
        return await this.userModel.findAll();
    }

    async add(user: UserRequest) {
        try {
            return await this.userModel.create({
                id: user.id,
                account_id: user.account_id,
                username: user.username,
                gender: user.gender,
                birth: user.birth,
                phone_number: user.phone_number,
                status_id: user.status_id,
                information: user.information,
                role_id: user.role_id,
            })
        }
        catch (error) {
            console.log("User.repository.add failed", error);
            throw new ConflictException("Email is currently existing");
        }
    }

    async findByUserName(username: string): Promise<any> {
        return await this.userModel.findAndCountAll({ where: { username: username } });
    }

    async findUserById(id: string): Promise<any> {
        return await this.userModel.findAndCountAll({ where: { id: id } });
    }

    async updateUserById(user: UserRequest, id: string) {
        try {
            return await this.userModel.update({
                id: user.id,
                account_id: user.account_id,
                username: user.username,
                gender: user.gender,
                birth: user.birth,
                phone_number: user.phone_number,
                status_id: user.status_id,
                information: user.information,
                role_id: user.role_id,
            }, {
                where: {
                    id: id,
                }
            })
        }
        catch (error) {
            console.log("User.repository.update failed");
        }
    }

    async deleteUserById(id: string) {
        return await this.userModel.destroy({
            where: {
                id: id,
            },
        });
    }
}