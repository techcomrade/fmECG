import { UserRepository } from "./user.repository";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserService } from "./user.service";
import { UserModel } from "../../entities/user.model";
import { UserRoleModel } from "../../entities/user_role.model";
import { UserStatusModel } from "../../entities/user_status.model";
import { DeviceModel } from "../../entities/device.model";
import { ScheduleModel } from "../../entities/schedule.model";
import { ConsultationScheduleModel } from "../../entities/consultation_schedule.model";
import { ConsultationScheduleModule } from "../consultation_schedule/consultation_schedule.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      UserRoleModel,
      UserStatusModel,
      ScheduleModel,
      DeviceModel,
      ConsultationScheduleModel,
    ]),
    ConsultationScheduleModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
