import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RecordModel } from "../../entities/record.model";
import { RecordRequest } from "./dto/record.request";
import { RecordResponse } from "./dto/record.response";

@Injectable()
export class RecordRepository {
  constructor(
    @InjectModel(RecordModel)
    private recordModel: typeof RecordModel
  ) {}

  async getAllRecord(): Promise<RecordResponse[]> {
    return await this.recordModel.findAll();
  }

  async add(record: RecordRequest) {
    return await this.recordModel.create({
      id: record.id,
      patient_id: record.patient_id,
      device_id: record.device_id,
      schedule_id: record.schedule_id,
      start_time: record.start_time,
      end_time: record.end_time,
      data_rec_url: record.data_rec_url,
    });
  }

  async updateRecordById(record: RecordRequest, id: string) {
    return await this.recordModel.update(
      {
        patient_id: record.patient_id,
        device_id: record.device_id,
        schedule_id: record.schedule_id,
        start_time: record.start_time,
        end_time: record.end_time,
        data_rec_url: record.data_rec_url,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async getRecordById(id: string): Promise<RecordResponse> {
    return await this.recordModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async getRecordByDeviceId(device_id: string): Promise<RecordResponse[]> {
    return await this.recordModel.findAll({
      where: {
        device_id: device_id,
      },
    });
  }

  async deleteRecordById(id: string) {
    return await this.recordModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
