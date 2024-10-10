import { DeviceModel } from "../../entities/device.model";
import { DeviceRepository } from "./device.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeviceService {
  constructor(private deviceRepository: DeviceRepository) {}

  async getAllData(): Promise<DeviceModel[]> {
    return this.deviceRepository.getAllData();
  }

  async add(device: DeviceModel) {
    return this.deviceRepository.add(device);
  }

  async updateById(device: DeviceModel, id: string) {
    return this.deviceRepository.updateById(device, id);
  }

  async getById(id: string): Promise<DeviceModel> {
    return this.deviceRepository.getById(id);
  }

  async getByUserId(user_id: string): Promise<DeviceModel[]> {
    return this.deviceRepository.getByUserId(user_id);
  }

  async getByDoctorId(doctor_id: string): Promise<DeviceModel[]> {
    return this.deviceRepository.getByDoctorId(doctor_id);
  }

  async deleteById(id: string) {
    return this.deviceRepository.deleteById(id);
  }
}
