import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RecordModel } from "../../entities/record.model";
import { ScheduleModel } from "../../entities/schedule.model";
import { UserModel } from "../../entities/user.model";
import { DeviceModel } from "../../entities/device.model";
import { RecordDiagnosisModel } from "../../entities/record_diagnosis.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      RecordModel,
      DeviceModel,
      UserModel,
      ScheduleModel,
      RecordDiagnosisModel,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DeviceModule {}
