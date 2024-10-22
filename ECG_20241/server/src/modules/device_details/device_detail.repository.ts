import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DeviceDetailModel } from "../../entities/device_detail.model";
import { DeviceDetailResponse } from "./dto/device_detail.response";

@Injectable()
export class DeviceDetailRepository {
  constructor(
    @InjectModel(DeviceDetailModel)
    private deviceDetailModel: typeof DeviceDetailModel
  ) {}

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
