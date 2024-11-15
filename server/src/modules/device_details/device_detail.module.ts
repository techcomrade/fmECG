import { DeviceDetailRepository } from "./device_detail.repository";
import { Module } from "@nestjs/common";
import { DeviceDetailController } from "./device_detail.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { DeviceDetailService } from "./device_detail.service";
import { DeviceDetailModel } from "../../entities/device_detail.model";
import { DeviceModel } from "../../entities/device.model";

@Module({
  imports: [SequelizeModule.forFeature([DeviceDetailModel, DeviceModel])],
  controllers: [DeviceDetailController],
  providers: [DeviceDetailService, DeviceDetailRepository],
  exports: [DeviceDetailService, DeviceDetailRepository],
})
export class DeviceDetailModule {}
