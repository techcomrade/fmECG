import { DeviceModel } from "./model/device.model";
import { DeviceRepository } from "./model/device.repository";
import { Injectable } from "@nestjs/common";
import { Device } from './interfaces/device.interface';

@Injectable()
export class DeviceService {
  constructor(private deviceRepository: DeviceRepository) {}

  async getAllData(): Promise<Device[]> {
    return this.deviceRepository.getAllData();
  }

  async add(device: Device) {
    return this.deviceRepository.add(device);
  }

  async updateById(device: Device, id: string) {
    return this.deviceRepository.updateById(device, id);
  }

  async getById(id: string): Promise<Device> {
    return this.deviceRepository.getById(id);
  }

  async getByUserId(user_id: string): Promise<Device[]> {
    return this.deviceRepository.getByUserId(user_id);
  }

  async getByDoctorId(doctor_id: string): Promise<Device[]> {
    return this.deviceRepository.getByDoctorId(doctor_id);
  }

  async deleteById(id: string) {
    return this.deviceRepository.deleteById(id);
  }
}
