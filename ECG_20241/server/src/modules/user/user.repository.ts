import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../../entities/user.model";
import { UserRequest } from "./dto/user.request";
import { UserResponse } from "./dto/user.response";
import { UserRoleModel } from "../../entities/user_role.model";
import { UserStatusModel } from "../../entities/user_status.model";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @InjectModel(UserRoleModel)
    private userRoleModel: typeof UserRoleModel,
    @InjectModel(UserStatusModel)
    private userStatusModel: typeof UserStatusModel
  ) {}

  async getAllUsers(): Promise<UserResponse[]> {
    return await this.userModel.findAll();
  }

  async getAllDoctors(): Promise<UserResponse[]> {
    return await this.userModel.findAll({
      where: { role_id: 2 },
    });
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
      });
    } catch (error) {
      console.log("User.repository.add failed", error);
      throw new ConflictException("Email is currently existing");
    }
  }

  async getUserByUserName(username: string): Promise<UserResponse[]> {
    return await this.userModel.findAll({
      where: { username: username },
    });
  }

  async getUserById(id: string): Promise<UserResponse> {
    return await this.userModel.findOne({
      where: { id: id },
    });
  }

  async updateUserById(user: UserRequest, id: string) {
    try {
      return await this.userModel.update(
        {
          id: user.id,
          account_id: user.account_id,
          username: user.username,
          gender: user.gender,
          birth: user.birth,
          phone_number: user.phone_number,
          status_id: user.status_id,
          information: user.information,
          role_id: user.role_id,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (error) {
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
