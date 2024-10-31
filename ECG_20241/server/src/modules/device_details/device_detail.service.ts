import { DeviceDetailRepository } from "./device_detail.repository";
import { Injectable } from "@nestjs/common";
import { DeviceDetailRequest } from "./dto/device_detail.request";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class DeviceDetailService {
  constructor(private deviceDetailRepository: DeviceDetailRepository) {}

  async addDetail(deviceDetail: DeviceDetailRequest) {
    deviceDetail.id = uuidv4();
    await this.deviceDetailRepository.addDetail(deviceDetail);
  }

  async getDetailByDeviceIdAndFreqType(device_id: string) {
    return await this.deviceDetailRepository.getDetailByIdAndFreqType(
      device_id
    );
  }

  async getDetailByDeviceIdAndConnectionType(device_id: string) {
    return await this.deviceDetailRepository.getDetailByIdAndConnectionType(
      device_id
    );
  }

  async getDetailByDeviceIdAndStorageType(device_id: string) {
    return await this.deviceDetailRepository.getDetailByIdAndStorageType(
      device_id
    );
  }

  async updateDetailById(deviceDetail: DeviceDetailRequest, id: string) {
    return await this.deviceDetailRepository.updateDetailById(deviceDetail, id);
  }
  async deleteDetailById(id: string) {
    return await this.deviceDetailRepository.deleteDetailById(id);
  }
}
