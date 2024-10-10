import { UserRepository } from "./user.repository";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserService } from "./user.service";
import { UserModel } from "../../entities/user.model";
import { TokenModule } from "../token/token.module";
import { UserRoleModel } from "../../entities/user_role.model";
import { UserStatusModel } from "../../entities/user_status.model";

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, UserRoleModel, UserStatusModel]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
