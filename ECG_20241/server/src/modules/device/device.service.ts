import { DeviceRepository } from "./device.repository";
import { Injectable } from "@nestjs/common";
import { DeviceRequest } from "./dto/device.request";
import { DeviceResponse } from "./dto/device.response";

@Injectable()
export class DeviceService {
  constructor(private deviceRepository: DeviceRepository) {}

  async getAllData(): Promise<DeviceResponse[]> {
    return this.deviceRepository.getAllData();
  }

  async add(device: DeviceRequest) {
    return this.deviceRepository.add(device);
  }

  async updateById(device: DeviceRequest, id: string) {
    return this.deviceRepository.updateById(device, id);
  }

  async getById(id: string): Promise<DeviceResponse> {
    return this.deviceRepository.getById(id);
  }

  async getByUserId(user_id: string): Promise<DeviceResponse[]> {
    return this.deviceRepository.getByUserId(user_id);
  }

  async getByDoctorId(doctor_id: string): Promise<DeviceResponse[]> {
    return this.deviceRepository.getByDoctorId(doctor_id);
  }

  async getByDeviceTypeId(device_type_id: string): Promise<DeviceResponse> {
    return this.deviceRepository.getByDeviceType(device_type_id);
  }

  async getByDeviceName(name: string): Promise<DeviceResponse[]> {
    return this.deviceRepository.getDeviceByDeviceName(name);
  }

  async deleteById(id: string) {
    return this.deviceRepository.deleteById(id);
  }
}
