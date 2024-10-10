import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../../entities/user.model";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel
  ) {}

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
        image: user.image,
        role_id: user.role_id,
        status_id: user.status_id,
        information: user.information,
      });
    } catch (error) {
      console.log("User.repository.add failed", error);
      return false;
    }
  }

  // async findByEmail(email: string): Promise<UserModel>{
  //     return await this.userModel.findOne({ where: { email: email } });
  // }
}
