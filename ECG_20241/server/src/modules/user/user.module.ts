import { UserRepository } from "./user.repository";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserService } from "./user.service";
import { UserModel } from "../../entities/user.model";
import { TokenModule } from "../token/token.module";
import { UserRoleModel } from "../../entities/user_role.model";
import { UserStatusModel } from "../../entities/user_status.model";
import { AccountModel } from "../../entities/account.model";
import { DeviceModel } from "../../entities/device.model";
import { ScheduleModel } from "../../entities/schedule.model";
import { ConsultationScheduleModel } from "../../entities/consultation_schedule.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      AccountModel,
      UserRoleModel,
      UserStatusModel,
      ScheduleModel,
      DeviceModel,
      ConsultationScheduleModel,
    ]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule { }
