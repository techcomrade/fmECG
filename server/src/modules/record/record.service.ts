import { RecordRequest } from "./dto/record.request";
import { RecordResponse } from "./dto/record.response";
import { RecordRepository } from "./record.repository";
import { Injectable } from "@nestjs/common";
import { DeviceService } from "../device/device.service";
import { UserService } from "../user/user.service";
const { v4: uuidv4 } = require("uuid");
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class RecordService {
  constructor(
    private deviceService: DeviceService,
    private userService: UserService,
    private recordRepository: RecordRepository
  ) {}

  private async saveFile(
    file: Express.Multer.File,
    deviceId: string,
    startTime: bigint
  ) {
    const uploadDir = path.resolve(__dirname, "..", "..", "public", "upload");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const uniqueFileName = `${deviceId}-${startTime}-${file.originalname}`;
    const filePath = path.join(uploadDir, uniqueFileName);
    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }

  async add(record: RecordRequest, file: Express.Multer.File) {
    record.id = uuidv4();
    try {
      record.data_rec_url = await this.saveFile(
        file,
        record.device_id,
        record.start_time
      );
      return await this.recordRepository.add(record);
    } catch (e) {
      console.log("Error when create record", e);
      if (record.data_rec_url) {
        await this.deleteFile(record.data_rec_url);
      }
      throw new Error("Failed to add record. File has been removed.");
    }
  }

  private async deleteFile(filePath: string) {
    try {
      const fullPath = path.resolve(__dirname, "..", "..", filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log("File removed:", fullPath);
      } else {
        console.warn("File not found for deletion:", fullPath);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  async getAllRecord(): Promise<RecordResponse[]> {
    let result = [];
    let records = await this.recordRepository.getAllRecord();
    for (const record of records) {
      let patient = await this.userService.getUserById(record.patient_id);
      let device = await this.deviceService.getById(record.device_id);
      let doctor = await this.userService.getUserById(device.doctor_id);
      result.push({
        ...(<any>record).dataValues,
        patient: patient.username,
        doctor: doctor.username,
        device_name: device.device_name,
      });
    }
    return result;
  }

  async countRecordsPerMonth(): Promise<any> {
    return await this.recordRepository.countRecordsPerMonth();
  }

  async getRecordByPatientId(patient_id: string): Promise<RecordResponse[]> {
    let result = [];
    let records = await this.recordRepository.getRecordByPatientId(patient_id);
    for (const record of records) {
      let device = await this.deviceService.getById(record.device_id);
      let doctor = await this.userService.getUserById(device.doctor_id);
      result.push({
        ...(<any>record).dataValues,
        doctor: doctor.username,
        device_name: device.device_name,
      });
    }
    return result;
  }

  async getRecordByDoctorId(doctor_id: string): Promise<RecordResponse[]> {
    let result = [];
    let devices = await this.deviceService.getByDoctorId(doctor_id);
    for (const device of devices) {
      let records = await this.recordRepository.getRecordByDeviceId(device.id);
      if (records && records.length > 0) {
        for (const record of records) {
          let patient = await this.userService.getUserById(record.patient_id);
          result.push({
            ...(<any>record).dataValues,
            patient: patient.username,
            device_name: device.device_name,
          });
        }
      }
    }
    return result;
  }

  async getRecordById(id: string): Promise<RecordResponse> {
    let record = await this.recordRepository.getRecordById(id);
    let patient = await this.userService.getUserById(record.patient_id);
    let device = await this.deviceService.getById(record.device_id);
    let doctor = await this.userService.getUserById(device.doctor_id);
    return {
      ...(<any>record).dataValues,
      patient: patient.username,
      doctor: doctor.username,
      device_name: device.device_name,
    };
  }

  async getRecordByDeviceName(device_name: string): Promise<RecordResponse[]> {
    let result = [];
    let devices = await this.deviceService.getByDeviceName(device_name);
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
    return await this.recordRepository.updateRecordById(record, id);
  }

  async deleteRecordById(id: string) {
    return await this.recordRepository.deleteRecordById(id);
  }
}
