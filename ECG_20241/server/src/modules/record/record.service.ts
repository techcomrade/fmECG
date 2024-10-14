import { RecordRequest } from "./dto/record.request";
import { RecordResponse } from "./dto/record.response";
import { RecordRepository } from "./record.repository";
import { DeviceRepository } from "../device/device.repository";
import { Injectable } from "@nestjs/common";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class RecordService {
  constructor(
    private deviceRepository: DeviceRepository,
    private recordRepository: RecordRepository
  ) {}

  async add(record: RecordRequest) {
    record.id = uuidv4();
    return this.recordRepository.add(record);
  }

  async getAllRecord(): Promise<RecordResponse[]> {
    return this.recordRepository.getAllRecord();
  }

  async getRecordById(id: string): Promise<RecordResponse> {
    return this.recordRepository.getRecordById(id);
  }

  async getRecordByDeviceName(device_name: string): Promise<RecordResponse[]> {
    let result = [];
    let devices = await this.deviceRepository.getDeviceByDeviceName(
      device_name
    );
    for (const device of devices) {
      let records = await this.recordRepository.getRecordByDeviceId(device.id);
      const recordsWithDeviceName = records.map((record: any) => {
        return {
          ...record.dataValues,
          device_name: device_name,
        };
      });
      result.push(...recordsWithDeviceName);
    }
    return result;
  }

  async updateRecordById(record: RecordRequest, id: string) {
    return this.recordRepository.updateRecordById(record, id);
  }

  async deleteRecordById(id: string) {
    return this.recordRepository.deleteRecordById(id);
  }
}
