import { DeviceDetailRepository } from "./device_detail.repository";
import { Injectable } from "@nestjs/common";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class DeviceDetailService {
  constructor(private deviceDetailRepository: DeviceDetailRepository) {}
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
