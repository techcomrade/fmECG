import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RecordModel } from "../../entities/record.model";
import { ScheduleModel } from "../../entities/schedule.model";
import { UserModel } from "../../entities/user.model";
import { DeviceModel } from "../../entities/device.model";
import { RecordDiagnosisModel } from "../../entities/record_diagnosis.model";
import { DeviceModule } from "../device/device.module";
import { RecordController } from "./record.controller";
import { RecordService } from "./record.service";
import { RecordRepository } from "./record.repository"

@Module({
  imports: [
    SequelizeModule.forFeature([
      RecordModel,
      DeviceModel,
      UserModel,
      ScheduleModel,
      RecordDiagnosisModel,
    ]),
    DeviceModule,
  ],
  controllers: [RecordController],
  providers: [RecordRepository, RecordService],
  exports: [RecordService],
})
export class RecordModule {}
