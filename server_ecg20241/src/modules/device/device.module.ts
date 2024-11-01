import { DeviceRepository } from "./device.repository";
import { Module } from "@nestjs/common";
import { DeviceController } from "./device.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { DeviceService } from "./device.service";
import { DeviceModel } from "../../entities/device.model";
import { RecordModel } from "../../entities/record.model";
import { RecordDiagnosisModel } from "../../entities/record_diagnosis.model";
import { DeviceStatusModel } from "../../entities/device_status.model";
import { DeviceTypeModel } from "../../entities/device_type.model";
import { DeviceScheduleModel } from "../../entities/device_schedule.model";
import { DeviceDetailModel } from "../../entities/device_detail.model";
import { UserModule } from "../user/user.module";
import { DeviceDetailModule } from "../device_details/device_detail.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      DeviceModel,
      DeviceStatusModel,
      DeviceTypeModel,
      DeviceScheduleModel,
      RecordModel,
      RecordDiagnosisModel,
      DeviceDetailModel,
    ]),
    UserModule,
    DeviceDetailModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
  exports: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
