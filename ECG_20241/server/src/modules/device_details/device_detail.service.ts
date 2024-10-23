import { DeviceDetailRepository } from "./device_detail.repository";
import { Injectable } from "@nestjs/common";
import { DeviceDetailRequest } from "./dto/device_detail.request";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class DeviceDetailService {
  constructor(private deviceDetailRepository: DeviceDetailRepository) {}

  async addDetail(deviceDetail: DeviceDetailRequest) {
    deviceDetail.id = uuidv4();
    return await this.deviceDetailRepository.addDetail(deviceDetail);
  }
  async getDetailByIdAndFreqType(device_id: string) {
    return await this.deviceDetailRepository.getDetailByIdAndFreqType(
      device_id
    );
  }

  async getDetailByIdAndConnectionType(device_id: string) {
    return await this.deviceDetailRepository.getDetailByIdAndConnectionType(
      device_id
    );
  }

  async getDetailByIdAndStorageType(device_id: string) {
    return await this.deviceDetailRepository.getDetailByIdAndStorageType(
      device_id
    );
  }
}
