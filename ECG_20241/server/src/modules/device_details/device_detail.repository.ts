import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DeviceDetailModel } from "../../entities/device_detail.model";
import { DeviceDetailResponse } from "./dto/device_detail.response";
import { DeviceDetailRequest } from "./dto/device_detail.request";

@Injectable()
export class DeviceDetailRepository {
  constructor(
    @InjectModel(DeviceDetailModel)
    private deviceDetailModel: typeof DeviceDetailModel
  ) {}

  async addDetail(deviceDetail: DeviceDetailRequest) {
    return await this.deviceDetailModel.create({
      id: deviceDetail.id,
      device_id: deviceDetail.device_id,
      detail_name: deviceDetail.detail_name,
      information: deviceDetail.information ?? "",
      value: deviceDetail.value,
      detail_type: deviceDetail.detail_type,
    });
  }
  async getDetailByDeviceId(
    device_id: string
  ): Promise<DeviceDetailResponse[]> {
    return await this.deviceDetailModel.findAll({
      where: {
        device_id: device_id,
      },
    });
  }

  async getDetailByIdAndFreqType(device_id: string) {
    return await this.deviceDetailModel.findAll({
      where: {
        device_id: device_id,
        detail_type: 1,
      },
    });
  }

  async getDetailByIdAndConnectionType(device_id: string) {
    return await this.deviceDetailModel.findAll({
      where: {
        device_id: device_id,
        detail_type: 2,
      },
    });
  }

  async getDetailByIdAndStorageType(device_id: string) {
    return await this.deviceDetailModel.findAll({
      where: {
        device_id: device_id,
        detail_type: 3,
      },
    });
  }
}
