import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "../../entities/user.model";
import { ScheduleModule } from "../schedule/schedule.module";
import { ConsultationScheduleModel } from "../../entities/consultation_schedule.model";
import { ScheduleModel } from "../../entities/schedule.model";
import { ConsultationScheduleRepository } from "./consultation_schedule.repository";
import { UserModule } from "../user/user.module";
import { ConsultationScheduleService } from "./consultation_schedule.service";
import { ConsultationSchedulesController } from "./consultation_schedule.controller";

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      ScheduleModel,
      ConsultationScheduleModel,
    ]),
    UserModule,
    // ScheduleModule
  ],
  controllers: [ConsultationSchedulesController],
  providers: [ConsultationScheduleRepository, ConsultationScheduleService],
  exports: [ConsultationScheduleService],
})
export class ConsultationScheduleModule {}
