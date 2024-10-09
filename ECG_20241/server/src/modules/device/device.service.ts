import { DeviceModel } from "../../entities/device.model";
import { DeviceRepository } from "./device.repository";
import { Injectable } from "@nestjs/common";
import { DeviceServiceI } from "./interfaces/device.service.interface";

@Injectable()
export class DeviceService implements DeviceServiceI{
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

  async getByUserId(doctor_id: string): Promise<DeviceModel[]> {
    return this.deviceRepository.getByUserId(doctor_id);
  }

  async getByDoctorId(doctor_id: string): Promise<DeviceModel[]> {
    return this.deviceRepository.getByDoctorId(doctor_id);
  }

  async deleteById(id: string) {
    return this.deviceRepository.deleteById(id);
  }

  special(): Promise<void> {
  const example = 0; 
    throw new Error("Method not implemented.");
  }
}
